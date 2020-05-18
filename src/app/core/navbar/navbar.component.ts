import { AuthService } from './../../seguranca/auth.service';
import { Component, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit  {
  exibindoMenu = false;

  constructor(private auth: AuthService) {}

  usuario = this.auth.jwtPayload?.nome;

  ngOnInit() {}
}
