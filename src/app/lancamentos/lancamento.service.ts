import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';

export interface LancamentoFiltro {
  descricao: string;
}

@Injectable({
  providedIn: 'root'
})
export class LancamentoService {

  lancamentoUrl = environment.API + 'lancamento';

  constructor(private http: HttpClient) { }

  findAllResumido(filtro: LancamentoFiltro): Observable<any> {
    let params = new HttpParams();

    if (filtro.descricao) {
      params = params.set('descricao', filtro.descricao);
    }

    return this.http.get(this.lancamentoUrl + '?resumo', {params})
    .pipe(take(1));
  }
}
