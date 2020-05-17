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

  constructor(private http: HttpClient) { }

  login(usuario: string, senha: string): Observable<any> {

    const headers = new HttpHeaders({
      'Authorization': 'Basic YW5ndWxhcjpAbmd1bEByMA==',
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    const body = `username=${usuario}&password=${senha}&grant_type=password`;
    console.log(body);

    let params = new HttpParams();
    params = params.set('overwrite', 'true');

    return this.http.post(this.oauthTokenUrl, body, { headers, params }).pipe(take(1));
  }
}
