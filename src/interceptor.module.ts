import { AuthService } from './app/seguranca/auth.service';
import { MessageService } from 'primeng/api';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, config } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable()
export class HttpsRequestInterceptor implements HttpInterceptor {

  constructor(
    private messageService: MessageService,
    private auth: AuthService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let dupReq;
    console.log(req);
    if (!req.params.has('overwrite')) {
       dupReq = req.clone({
        headers: req.headers.set('Authorization', `BEARER ${this.auth.getToken}`),
        setHeaders: {'Content-Type': 'application/json'}
      });
    } else {
      dupReq = req.clone();
    }
    return next.handle(dupReq)
    .pipe(
      retry(2),
      catchError((error: HttpErrorResponse) => {
        const errorMessage = {summary: '', detail: ''};
        if (error.error instanceof ErrorEvent) {
          errorMessage.summary = 'Erro na requisição';
          errorMessage.detail = error.error.message;
        } else {
          errorMessage.summary = 'Erro no servidor';
          errorMessage.detail = `Erro ao processar serviço remoto, tente novamente.`;
        }
        if (error.status >= 400 && error.status <= 499 && error.error[0]) {
          errorMessage.detail = error.error[0].mensagemDesenvolvedor;
        }
        if (error.error.error === 'invalid_grant') {
          errorMessage.summary = 'Erro no login';
          errorMessage.detail = 'Usuario ou senha incorretos';
        }
        this.messageService.add({ key: 'errorHttp', severity: 'error', summary: errorMessage.summary, detail: errorMessage.detail });
        return throwError(errorMessage);
      })
    );
  }
}
