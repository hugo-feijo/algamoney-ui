import { Router } from '@angular/router';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }
  load = false;

  ngOnInit(): void {
  }

  login(login: string, senha: string) {
    this.load = true;
    this.auth.login(login, senha).subscribe(
      success => {
        this.load = false;
        this.auth.armazenarToken(success.access_token);
        this.router.navigate(['/lancamento']);
      },
      error => {
        this.load = false;
        console.log(error);
      }
    );
  }
}
