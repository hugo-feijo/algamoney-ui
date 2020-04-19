import { MessageService } from 'primeng/api';
import { LancamentoService } from './../lancamento.service';
import { PessoaService } from './../../pessoas/pessoa.service';
import { CategoriaService } from './../../categorias/categoria.service';
import { Component, OnInit } from '@angular/core';
import { Lancamento } from 'src/app/core/model';
import { FormControl, NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css']
})
export class LancamentoCadastroComponent implements OnInit {

  constructor(
    private categoriaService: CategoriaService,
    private pessoaService: PessoaService,
    private lancamentoService: LancamentoService,
    private messageService: MessageService,
    private router: ActivatedRoute
    ) { }

  tipoLancamento = [
    { label: 'Receita', value: 'RECEITA' },
    { label: 'Despesa', value: 'DESPESA' },
  ];
  categorias = [];
  pessoas = [];
  br: any;
  valor: any;
  lancamento = new Lancamento();

  ngOnInit() {
    console.log(this.router.snapshot.params['codigo']);
    this.br = {
      firstDayOfWeek: 0,
      dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
      dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
      dayNamesMin: ['Do', 'Se', 'Te', 'Qa', 'Qi', 'Se', 'Sa'],
      monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho',
        'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
      monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
      today: 'Hoje',
      clear: 'Limpar',
      dateFormat: 'dd/mm/yy',
      weekHeader: 'Wk'
    };
    this.findCategoria();
    this.findPessoas();
  }

  salvar(form: NgForm) {
    this.lancamentoService.insert(this.lancamento).subscribe(
      success => {
        console.log(success);
        form.reset();
        this.lancamento = new Lancamento();
        this.addToast();
      }
    );
  }

  findCategoria() {
    this.categoriaService.findAll().subscribe(
      success => {
        this.categorias = success.map(c => {
          return { label: c.nome, value: c.codigo };
        });
      }
    );
  }

  findPessoas() {
    this.pessoaService.findAll(null).subscribe(
      success => {
        this.pessoas = success.content.map(p => {
          return { label: p.nome, value: p.codigo};
        });
      }
    );
  }

  addToast() {
    this.messageService.add({ key: 'success', severity: 'success', summary: 'Sucesso', detail: 'Lançamento adicionado com sucesso' });
  }

}
