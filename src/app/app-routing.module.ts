import { PessoasPesquisaComponent } from './pessoas/pessoas-pesquisa/pessoas-pesquisa.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PessoaCadastroComponent } from './pessoas/pessoa-cadastro/pessoa-cadastro.component';
import { LancamentoCadastroComponent } from './lancamentos/lancamento-cadastro/lancamento-cadastro.component';
import { LancamentosPesquisaComponent } from './lancamentos/lancamentos-pesquisa/lancamentos-pesquisa.component';


const routes: Routes = [
  { path: '', component: PessoaCadastroComponent },
  { path: 'lancamento', component: LancamentosPesquisaComponent },
  { path: 'lancamento/novo', component: LancamentoCadastroComponent },
  { path: 'pessoa', component: PessoasPesquisaComponent },
  { path: 'pessoa/novo', component: PessoaCadastroComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
