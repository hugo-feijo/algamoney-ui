import { take } from 'rxjs/operators';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  categoriaUrl = environment.API + 'categorias';
  constructor(private http: HttpClient) { }

  findAll() {
    return this.http.get(this.categoriaUrl).pipe(take(1));
  }
}
