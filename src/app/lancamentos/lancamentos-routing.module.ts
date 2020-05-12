import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LancamentoCadastroComponent } from './lancamento-cadastro/lancamento-cadastro.component';
import { LancamentosPesquisaComponent } from './lancamentos-pesquisa/lancamentos-pesquisa.component';


const routes: Routes = [
  { path: 'lancamento', component: LancamentosPesquisaComponent },
  { path: 'lancamento/novo', component: LancamentoCadastroComponent },
  { path: 'lancamento/:codigo', component: LancamentoCadastroComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class LancamentoRoutingModule { }
