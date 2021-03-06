import { AuthService } from './../../seguranca/auth.service';
import { LancamentoService, LancamentoFiltro } from './../lancamento.service';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent implements OnInit {

  totalRegistro = 0;
  filtro = new LancamentoFiltro();
  lancamentos = [];
  br: any;

  constructor(
    private lancamentoService: LancamentoService,
    private title: Title,
    public auth: AuthService
  ) {}


  ngOnInit() {
    this.title.setTitle('Pesquisa de lançamento');
    this.br = {
      firstDayOfWeek: 0,
      dayNamesMin: ['Do', 'Se', 'Te', 'Qa', 'Qi', 'Se', 'Sa'],
      monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho',
        'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
      today: 'Hoje',
      clear: 'Limpar',
    };
  }

  findAllResumido(pagina = 0) {
    this.filtro.pagina = pagina;
    this.lancamentoService.findAllResumido(this.filtro).subscribe(
      success => {
        this.lancamentos = success.content;
        this.totalRegistro = success.totalElements;
      }
    );
  }

}
