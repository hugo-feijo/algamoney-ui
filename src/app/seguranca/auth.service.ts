import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  oauthTokenUrl = environment.API + 'oauth/token';
  jwtPayload: any;

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService
  ) {
    this.carregarToken();
  }

  login(usuario: string, senha: string): Observable<any> {

    const headers = new HttpHeaders({
      // tslint:disable-next-line: object-literal-key-quotes
      'Authorization': 'Basic YW5ndWxhcjpAbmd1bEByMA==',
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    const body = `username=${usuario}&password=${senha}&grant_type=password`;

    let params = new HttpParams();
    params = params.set('overwrite', 'true');

    return this.http.post(this.oauthTokenUrl, body, { headers, params }).pipe(take(1));
  }

  armazenarToken(token: string) {
    this.jwtPayload = this.jwtHelper.decodeToken(token);
    localStorage.setItem('token', token);
  }

  get getToken() {
    return localStorage.getItem('token');
  }

  private carregarToken() {
    const token = localStorage.getItem('token');

    if (token) {
      this.armazenarToken(token);
    }
  }

  temPermissao(permissao: string) {
    return this.jwtPayload && this.jwtPayload.authorities.includes(permissao);
  }
}
