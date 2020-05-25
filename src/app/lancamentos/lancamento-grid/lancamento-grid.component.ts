import { AuthService } from './../../seguranca/auth.service';
import { LancamentoService } from './../lancamento.service';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { LazyLoadEvent, MessageService } from 'primeng/api';

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
  lancamento: any;
  event: LazyLoadEvent;

  constructor(
    private lancamentoService: LancamentoService,
    private messageService: MessageService,
    public auth: AuthService
  ) {}

  aoMudarPagina(eventLazy: LazyLoadEvent) {
    this.event = eventLazy;
    this.pagina.emit(this.event.first / this.event.rows);
  }

  delete(lancamento: any) {
    this.lancamentoService.delete(lancamento.codigo).subscribe(
      success => {
        this.pagina.emit(this.event.first / this.event.rows);
        this.addToastDeleteSuccess();
      },
      error => console.error(error)
    );
  }

  addToastDeleteSuccess() {
    this.messageService.add({ key: 'success', severity: 'success', summary: 'Success Message', detail: 'Order submitted' });
  }

  addToastDeleteConfirm(lancamento: any) {
    this.lancamento = lancamento;
    this.messageService.add({ key: 'confirmDelete', sticky: true, severity: 'warn',
    summary: 'Tem certeza que deseja excluir?', detail: 'Confirme para continuar' });
  }

  aoConfirmar() {
    this.delete(this.lancamento);
    this.messageService.clear();
  }
  aoRejeitar() {
    this.messageService.clear();
  }

}
