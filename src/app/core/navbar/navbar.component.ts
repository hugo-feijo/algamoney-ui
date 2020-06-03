import { AuthService } from './../../seguranca/auth.service';
import { Component, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit  {

  constructor(public auth: AuthService) {}
  exibindoMenu = false;

  usuario = this.auth.jwtPayload?.nome;
  valido = this.auth.isAccessTokenInvalido();

  ngOnInit() {}

}
