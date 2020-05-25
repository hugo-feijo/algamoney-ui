import { AuthService } from './app/seguranca/auth.service';
import { MessageService } from 'primeng/api';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject, observable, } from 'rxjs';
import { retry, catchError, take, mergeMap, switchMap, finalize, filter } from 'rxjs/operators';
import { JsonPipe } from '@angular/common';

@Injectable()
export class HttpsRequestInterceptor implements HttpInterceptor {

  constructor(
    private messageService: MessageService,
    private auth: AuthService
  ) {}
  private tokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private isRefreshingToken = false;

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!req.params.has('overwrite')) {
        const token = localStorage.getItem('access_token');
        req = this.addToken(req, token);
    }

    return next.handle(req)
    .pipe(
      retry(2),
      catchError((error: HttpErrorResponse) => {
        return this.handleError(error, req, next);
      })
    );
  }

  handleError(error: HttpErrorResponse, req: HttpRequest<any>, next: HttpHandler) {
    const errorMessage = { summary: '', detail: '' };

    if (error.error instanceof ErrorEvent) {
      errorMessage.summary = 'Erro na requisição';
      errorMessage.detail = error.error.message;
    } else {
      errorMessage.summary = 'Erro no servidor';
      errorMessage.detail = `Erro ao processar serviço remoto, tente novamente.`;
    }

    if (error.status >= 400 && error.status <= 499 ) {
      if (error.error[0]) {
        errorMessage.detail = error.error[0].mensagemDesenvolvedor;
      } else if (error.error.error_description) {
        errorMessage.detail = error.error.error_description;
      }
    }

    if (error.status === 403) {
      errorMessage.detail = 'Você não tem permissão para executar esta ação';
    }

    if (error.error.error === 'invalid_grant') {
      errorMessage.summary = 'Erro no login';
      errorMessage.detail = 'Usuario ou senha incorretos';
    }

    if (error.status === 401 && error.error.error === 'invalid_token') {
      return this.handleUnauthorized(req, next);
    }

    this.messageService.add({ key: 'errorHttp', severity: 'error', summary: errorMessage.summary, detail: errorMessage.detail });
    return throwError(errorMessage);
  }

  handleUnauthorized(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    if (!this.isRefreshingToken) {
      this.isRefreshingToken = true;
      this.tokenSubject.next(null);

      return this.auth.obterNovoAccessToken().pipe(
        switchMap((newToken: any) => {
          this.isRefreshingToken = false;
          if (newToken) {
            this.tokenSubject.next(newToken);
            this.auth.armazenarToken(newToken.access_token);
            return next.handle(this.addToken(req, newToken.access_token));
          } else {
            this.auth.doLogout();
            return throwError('');
          }
        })
          , finalize(() => {
            this.isRefreshingToken = false;
          })
        );
    } else {
      return this.tokenSubject
        .pipe(
          filter(token => token != null)
          , take(1)
          , switchMap(token => {
            return next.handle(this.addToken(req, token));
          })
        );
    }
  }

  addToken(req: HttpRequest<any>, token: string): HttpRequest<any> {
    return req.clone({
      headers: req.headers.set('Authorization', `BEARER ${token}`),
      setHeaders: { 'Content-Type': 'application/json' }
    });
  }

}
