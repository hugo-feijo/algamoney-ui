import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
  }

  login(login: string, senha: string) {
    this.auth.login(login, senha).subscribe(
      success => this.auth.armazenarToken(success.access_token),
      error => console.log(error)
    );
  }
}
