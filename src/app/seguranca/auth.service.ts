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
      Authorization: 'Basic YW5ndWxhcjpAbmd1bEByMA==',
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    const body = `username=${usuario}&password=${senha}&grant_type=password`;

    let params = new HttpParams();
    params = params.set('overwrite', 'true');

    return this.http.post(this.oauthTokenUrl, body, { headers, params, withCredentials: true }).pipe(take(1));
  }

  obterNovoAccessToken(): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: 'Basic YW5ndWxhcjpAbmd1bEByMA==',
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    let params = new HttpParams();
    params = params.set('overwrite', 'true');

    const body = 'grant_type=refresh_token';
    return this.http.post(this.oauthTokenUrl, body, { headers, params, withCredentials: true}).pipe(take(1));
  }

  armazenarToken(access_token: string) {
    this.jwtPayload = this.jwtHelper.decodeToken(access_token);
    localStorage.setItem('access_token', access_token);
  }

  get getToken() {
    return localStorage.getItem('access_token');
  }

  private carregarToken() {
    const access_token = localStorage.getItem('access_token');

    if (access_token) {
      this.armazenarToken(access_token);
    }
  }

  temPermissao(permissao: string) {
    return this.jwtPayload && this.jwtPayload.authorities.includes(permissao);
  }
}
