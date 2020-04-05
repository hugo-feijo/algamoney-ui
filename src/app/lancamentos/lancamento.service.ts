import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import * as moment from 'moment';

export class LancamentoFiltro {
  descricao: string;
  dataVencimentoDe: Date;
  dataVencimentoAte: Date;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable({
  providedIn: 'root'
})
export class LancamentoService {

  lancamentoUrl = environment.API + 'lancamento';

  constructor(private http: HttpClient) { }

  findAllResumido(filtro: LancamentoFiltro): Observable<any> {
    let params = new HttpParams();

    params = params.set('page', filtro.pagina.toString());
    params = params.set('size', filtro.itensPorPagina.toString());

    if (filtro.descricao) {
      params = params.set('descricao', filtro.descricao);
    }

    if (filtro.dataVencimentoDe) {
      params = params.set('dataVencimentoDe',
      moment(filtro.dataVencimentoDe).format('YYYY-MM-DD'));
    }

    if (filtro.dataVencimentoAte) {
      params = params.set('dataVencimentoAte',
      moment(filtro.dataVencimentoAte).format('YYYY-MM-DD'));
    }


    return this.http.get(this.lancamentoUrl + '?resumo', {params})
    .pipe(take(1));
  }

  delete(codigo: number){
    return this.http.delete(this.lancamentoUrl + `/${codigo}`).pipe(take(1));
  }
}
