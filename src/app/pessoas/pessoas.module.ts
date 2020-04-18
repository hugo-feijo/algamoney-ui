import { RouterModule } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { SharedModule } from './../shared/shared.module';
import { FormsModule } from '@angular/forms';

import { PessoasPesquisaComponent } from './pessoas-pesquisa/pessoas-pesquisa.component';
import { PessoaCadastroComponent } from './pessoa-cadastro/pessoa-cadastro.component';
import { PessoaGridComponent } from './pessoa-grid/pessoa-grid.component';

import { InputMaskModule } from 'primeng/inputmask';
import { TooltipModule } from 'primeng/tooltip';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    PessoaCadastroComponent,
    PessoasPesquisaComponent,
    PessoaGridComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,

    ButtonModule,
    InputTextModule,
    TableModule,
    TooltipModule,
    InputMaskModule,
    ToastModule,

    SharedModule
  ],
  exports: [
    PessoasPesquisaComponent,
    PessoaCadastroComponent
  ]
})
export class PessoasModule { }
