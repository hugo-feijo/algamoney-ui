import { SecurityModule } from './security/security.module';
import { LancamentoRoutingModule } from './lancamentos/lancamentos-routing.module';
import { PessoaCadastroComponent } from './pessoas/pessoa-cadastro/pessoa-cadastro.component';
import { RouterModule } from '@angular/router';
import { CategoriaService } from './categorias/categoria.service';
import { ToastModule } from 'primeng/toast';
import { PessoaService } from './pessoas/pessoa.service';
import { HttpsRequestInterceptor } from './../interceptor.module';
import { CoreModule } from './core/core.module';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LancamentosModule } from './lancamentos/lancamentos.module';
import { PessoasModule } from './pessoas/pessoas.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LancamentoService } from './lancamentos/lancamento.service';
import { MessageService } from 'primeng/api';

registerLocaleData(localePt);

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,

    CoreModule,
    ToastModule,
    LancamentosModule,
    PessoasModule,
    SecurityModule,
    AppRoutingModule
  ],
  providers: [
    LancamentoService,
    PessoaService,
    CategoriaService,
    MessageService,
    { provide: LOCALE_ID, useValue: 'pt'},
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpsRequestInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
