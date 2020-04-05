import { Component, Input, Output, EventEmitter } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';

@Component({
  selector: 'app-lancamento-grid',
  templateUrl: './lancamento-grid.component.html',
  styleUrls: ['./lancamento-grid.component.css']
})
export class LancamentoGridComponent {

  @Input() lancamentos = [];
  @Input() filtro: any;
  @Input() totalRegistro: number;
  @Output() pagina = new EventEmitter<number>();

  aoMudarPagina(event: LazyLoadEvent) {
    this.pagina.emit(event.first / event.rows);
  }
}
