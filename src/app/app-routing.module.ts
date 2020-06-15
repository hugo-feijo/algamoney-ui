import { NaoAutorizadoComponent } from './core/nao-autorizado/nao-autorizado.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaginaNaoEncontradaComponent } from './core/pagina-nao-encontrada.component';


const routes: Routes = [
  {
    path: 'lancamento',
    loadChildren: () => import('./lancamentos/lancamentos.module').then(l => l.LancamentosModule)
  },
  {
    path: 'pessoa',
    loadChildren: () => import('./pessoas/pessoas.module').then(p => p.PessoasModule)
  },
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'nao-autorizado', component: NaoAutorizadoComponent},
  { path: 'pagina-nao-encontrada', component: PaginaNaoEncontradaComponent},
  { path: '**', redirectTo: 'pagina-nao-encontrada'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
