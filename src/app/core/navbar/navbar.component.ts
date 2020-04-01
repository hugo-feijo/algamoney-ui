import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent  {
  exibindoMenu = false;

  @Output() pagina = new EventEmitter<string>();

  alterarPagina(value: string){
    this.pagina.emit(value);
  }
}
