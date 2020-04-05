import { PessoaService, PessoaFilter } from './../pessoa.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent implements OnInit {
  totalRegistro = 0;
  pessoas = [];
  filtro = new PessoaFilter();

  constructor(private pessoaService: PessoaService) {}

  ngOnInit() {
  }

  findAll(pagina = 0) {
    this.filtro.pagina = pagina;
    this.pessoaService.findAll(this.filtro).subscribe(
      success => {
        this.pessoas = success.content;
        this.totalRegistro = success.totalElements;
        console.log(success);
      }
    );
  }
}
