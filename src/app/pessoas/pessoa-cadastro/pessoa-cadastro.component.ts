import { MessageService } from 'primeng/api';
import { Pessoa } from './../../core/model';
import { PessoaService } from './../pessoa.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.css']
})
export class PessoaCadastroComponent {

  constructor(private pessoaService: PessoaService, private messageService: MessageService) { }

  pessoa = new Pessoa();

  salvar(form: NgForm) {
    console.log(this.pessoa);
    this.pessoaService.insert(this.pessoa).subscribe(
      success => {
        this.addToast();
        this.pessoa = new Pessoa();
        form.reset();
      }
    );
  }

  addToast() {
    this.messageService.add({ key: 'success', severity: 'success', summary: 'Sucesso', detail: 'Pessoa adicionado com sucesso' });
  }

}
