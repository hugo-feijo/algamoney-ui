import { LazyLoadEvent } from 'primeng/api';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pessoa-grid',
  templateUrl: './pessoa-grid.component.html',
  styleUrls: ['./pessoa-grid.component.css']
})
export class PessoaGridComponent {

  @Input() pessoas = [];
  @Input() filtro: any;
  @Input() totalRegistro: number;
  @Output() pagina = new EventEmitter<number>();

  aoMudarPagina(event: LazyLoadEvent){
    this.pagina.emit(event.first / event.rows);
  }
}
