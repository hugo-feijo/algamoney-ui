import { MessageService } from 'primeng/api';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable()
export class HttpsRequestInterceptor implements HttpInterceptor {

  constructor(private messageService: MessageService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const dupReq = req.clone({
      headers: req.headers.set('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==')
    });
    return next.handle(dupReq)
    .pipe(
      retry(3),
      catchError((error: HttpErrorResponse) => {
        const errorMessage = {summary: '', detail: ''};
        if(error.error instanceof ErrorEvent) {
          errorMessage.summary = 'Erro na requisição';
          errorMessage.detail = error.error.message;
        } else {
          errorMessage.summary = 'Erro no servidor';
          errorMessage.detail = `Erro ao processar serviço remoto, tente novamente.`;
        }
        this.messageService.add({ key: 'errorHttp', severity: 'error', summary: errorMessage.summary, detail: errorMessage.detail });
        console.error(error);
        return throwError(errorMessage);
      })
    );
  }
}
