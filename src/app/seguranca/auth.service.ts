import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  oauthTokenUrl = environment.API + 'oauth/token';
  revokeOauthTokenUrl = environment.API + 'tokens/revoke';
  jwtPayload: any;

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService
    ) {
      this.carregarToken();
    }

  doLogout() {
    this.http.delete(this.revokeOauthTokenUrl, { withCredentials: true }).pipe(take(1)).subscribe(s => console.log('remove success'));
    localStorage.removeItem('access_token');
    this.jwtPayload = null;

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

    return this.http.post(this.oauthTokenUrl, body, { headers, params, withCredentials: true})
    .pipe(take(1));
  }

  armazenarToken(accessToken: string) {
    this.jwtPayload = this.jwtHelper.decodeToken(accessToken);
    localStorage.setItem('access_token', accessToken);
  }

  isAccessTokenInvalido() {
    return !localStorage.getItem('access_token') || this.jwtHelper.isTokenExpired(localStorage.getItem('access_token'));
  }

  get getToken() {
    return localStorage.getItem('access_token');
  }

  private carregarToken() {
    const accessToken = localStorage.getItem('access_token');

    if (accessToken) {
      this.armazenarToken(accessToken);
    }
  }

  temPermissao(permissao: string) {
    return this.jwtPayload && this.jwtPayload.authorities.includes(permissao);
  }

  temQualquerPermissao(roles) {
    for (const role of roles) {
      if (this.temPermissao(role)) {
        return true;
      }
    }

    return false;
  }


}
