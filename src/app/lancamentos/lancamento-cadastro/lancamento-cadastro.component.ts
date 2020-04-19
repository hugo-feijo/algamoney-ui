import { MessageService } from 'primeng/api';
import { LancamentoService } from './../lancamento.service';
import { PessoaService } from './../../pessoas/pessoa.service';
import { CategoriaService } from './../../categorias/categoria.service';
import { Component, OnInit } from '@angular/core';
import { Lancamento } from 'src/app/core/model';
import { FormControl, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

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
    private router: Router,
    private route: ActivatedRoute,
    private title: Title
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
    this.title.setTitle('Novo lançamento');
    const codigoLancamento = this.route.snapshot.params.codigo;

    if (codigoLancamento) {
     this.loadLancamento(codigoLancamento);
    }

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

  get editando() {
    return Boolean(this.lancamento.codigo);
  }

  loadLancamento(codigo: number) {
    this.lancamentoService.findById(codigo).subscribe(
     success => {
       this.lancamento = success,
       this.atualizarTituloEdicao();
      }
    );
  }

  salvar(form: NgForm) {
    if (this.editando) {
      this.atualizar(form);
    } else {
      this.adicionarLancamento(form);
    }
  }

  atualizar(form: NgForm) {
    this.lancamentoService.update(this.lancamento).subscribe(
      success => {
        this.lancamento = success,
        this.atualizarTituloEdicao(),
        this.addToast('Lançamento alterado com sucesso.');
      }
    );
  }

  adicionarLancamento(form: NgForm) {
    this.lancamentoService.insert(this.lancamento).subscribe(
      success => {
        this.router.navigate(['/lancamento', success.codigo]);
        this.lancamento = new Lancamento();
        this.addToast('Lançamento adicionado com sucesso.');
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

  addToast(detail: string) {
    this.messageService.add({ key: 'success', severity: 'success', summary: 'Sucesso', detail });
  }

  novo(form: NgForm) {
    form.reset();
    setTimeout(() => {
      this.lancamento = new Lancamento();
    }, 1);
    this.router.navigate(['/lancamento/novo']);
  }

  atualizarTituloEdicao() {
    this.title.setTitle('Editando lançamento: ' + this.lancamento.descricao);
  }
}
