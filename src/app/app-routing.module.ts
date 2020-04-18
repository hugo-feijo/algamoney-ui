import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PessoaCadastroComponent } from './pessoas/pessoa-cadastro/pessoa-cadastro.component';
import { LancamentoCadastroComponent } from './lancamentos/lancamento-cadastro/lancamento-cadastro.component';


const routes: Routes = [
  { path: '', component: PessoaCadastroComponent },
  { path: 'lancamento', component: LancamentoCadastroComponent },
  { path: 'lancamento/novo', component: LancamentoCadastroComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
