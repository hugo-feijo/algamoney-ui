import { Lancamento } from './../core/model';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { take, map } from 'rxjs/operators';
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

  insert(lancamento: Lancamento): Observable<any> {
    return this.http.post(this.lancamentoUrl, JSON.stringify(lancamento)).pipe(take(1));
  }

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

  delete(codigo: number) {
    return this.http.delete(this.lancamentoUrl + `/${codigo}`).pipe(take(1));
  }

  update(lancamento: Lancamento): Observable<any> {
    return this.http.post(`${this.lancamentoUrl}/${lancamento.codigo}`, JSON.stringify(lancamento)).pipe(
      map(lanc => {
        this.parseStringToDate([lanc]);
        return lanc;
      }),
      take(1)
    );
  }

  findById(codigo: number): Observable<any> {
    return this.http.get(`${this.lancamentoUrl}/${codigo}`).pipe(
      map(lanc => {
        this.parseStringToDate([lanc]);
        return lanc;
      }),
      take(1)
    );
  }

  parseStringToDate(lancamentos: any[]) {
    lancamentos.forEach(lan => {
      lan.dataVencimento = moment(lan.dataVencimento, 'YYYY-MM-DD').toDate();
      if (lan.dataPagamento) {
        lan.dataPagamento = moment(lan.dataPagamento, 'YYYY-MM-DD').toDate();
      }
    });
  }
}
