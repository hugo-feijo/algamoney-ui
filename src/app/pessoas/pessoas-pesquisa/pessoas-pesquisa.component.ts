import { PessoaService, PessoaFilter } from './../pessoa.service';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent implements OnInit {

  totalRegistro = 0;
  pessoas = [];
  filtro = new PessoaFilter();

  constructor(private pessoaService: PessoaService, private title: Title) {}

  ngOnInit() {
    this.title.setTitle('Pesquisa de pessoa');
  }

  findAll(pagina = 0) {
    this.filtro.pagina = pagina;
    this.pessoaService.findAll(this.filtro).subscribe(
      success => {
        this.pessoas = success.content;
        this.totalRegistro = success.totalElements;
      }
    );
  }
}
