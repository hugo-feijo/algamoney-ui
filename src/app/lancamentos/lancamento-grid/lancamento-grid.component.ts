import { LancamentoService } from './../lancamento.service';
import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
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
  event: LazyLoadEvent;

  constructor(private lancamentoService: LancamentoService) {}

  aoMudarPagina(eventLazy: LazyLoadEvent) {
    this.event = eventLazy;
    console.log(this.event);
    this.pagina.emit(this.event.first / this.event.rows);
  }

  delete(lancamento: any) {
    this.lancamentoService.delete(lancamento.codigo).subscribe(
      success => {
        this.pagina.emit(this.event.first / this.event.rows);
        alert('Lançamento deletado com sucesso');
      },
      error => console.error(error)
    );
  }
}
