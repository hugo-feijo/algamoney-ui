import { AuthService } from './../../seguranca/auth.service';
import { PessoaService } from './../pessoa.service';
import { LazyLoadEvent, MessageService } from 'primeng/api';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pessoa-grid',
  templateUrl: './pessoa-grid.component.html',
  styleUrls: ['./pessoa-grid.component.css']
})
export class PessoaGridComponent {

  constructor(
    private messageService: MessageService,
    private pessoaService: PessoaService,
    public auth: AuthService
  ) {}

  pessoa: any;
  event: LazyLoadEvent;
  detailToast = '';
  @Input() pessoas = [];
  @Input() filtro: any;
  @Input() totalRegistro: number;
  @Output() pagina = new EventEmitter<number>();

  aoMudarPagina(event: LazyLoadEvent) {
    this.event = event;
    this.pagina.emit(event.first / event.rows);
  }

  delete() {
    this.pessoaService.delete(this.pessoa).subscribe(
      success => {
        this.pagina.emit(this.event.first / this.event.rows);
        this.detailToast = 'Pessoa deletada com sucesso!';
        this.addToast();
      }
      );
  }

  alterarStatus(pessoa: any) {
    this.pessoaService.alterarStatus(pessoa).subscribe(
      success => {
        this.pagina.emit(this.event.first / this.event.rows);
        this.detailToast = `Pessoa ${pessoa.ativo === false ? 'ativado' : 'inativado'} com sucesso!`;
        this.addToast();
      }
    );
  }

  addToast() {
    this.messageService.add({ key: 'success', severity: 'success', summary: 'Sucesso', detail: this.detailToast});
  }

  addToastConfirmDelete(pessoa: any) {
    this.pessoa = pessoa;
    this.messageService.add({
      key: 'confirmDelete', sticky: true, severity: 'warn',
      summary: 'Tem certeza que deseja excluir?', detail: 'Confirme para continuar'
    });
  }

  aoConfirmar() {
    this.delete();
    this.messageService.clear();
  }

  aoRejeitar() {
    this.messageService.clear();
  }
}
