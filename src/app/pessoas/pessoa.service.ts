import { take } from 'rxjs/operators';
import { environment } from './../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export class PessoaFilter {
  nome: string;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  pessoaUrl = environment.API + 'pessoa';

  constructor(private http: HttpClient) { }

  findAll(filtro: PessoaFilter): Observable<any> {
    let params = new HttpParams();

    if (filtro != null) {
      params = params.set('page', filtro.pagina.toString());
      params = params.set('size', filtro.itensPorPagina.toString());
      if (filtro.nome) {
        params = params.set('nome', filtro.nome);
      }
    }

    return this.http.get(this.pessoaUrl, {params}).pipe(take(1));
  }

  delete(pessoa: any) {
    return this.http.delete(this.pessoaUrl + `/${pessoa.codigo}`).pipe(take(1));
  }

  alterarStatus(pessoa: any) {
    return this.http.put(this.pessoaUrl + `/${pessoa.codigo}/ativo`, !pessoa.ativo).pipe(take(1));
  }
}
