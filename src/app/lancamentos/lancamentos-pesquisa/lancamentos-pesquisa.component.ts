import { Component, OnInit } from '@angular/core';
import { LancamentoService } from '../lancamento.service';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent implements OnInit {

  descricao: string;
  lancamentos = [];

  constructor(private lancamentoService: LancamentoService) { }

  ngOnInit() {
    this.findAllResumido();
  }

  findAllResumido() {
    console.log(`Pesquisando descricao: ${this.descricao}`);
    this.lancamentoService.findAllResumido({descricao:  this.descricao}).subscribe(
      success => { this.lancamentos = success.content; console.log(success); }
    );
  }

}
