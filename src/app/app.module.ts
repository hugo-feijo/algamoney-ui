import { PessoaService } from './pessoas/pessoa.service';
import { HttpsRequestInterceptor } from './../interceptor.module';
import { CoreModule } from './core/core.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LancamentosModule } from './lancamentos/lancamentos.module';
import { PessoasModule } from './pessoas/pessoas.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LancamentoService } from './lancamentos/lancamento.service';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,

    LancamentosModule,
    PessoasModule,
    CoreModule
  ],
  providers: [LancamentoService, PessoaService,
    {
    provide: HTTP_INTERCEPTORS,
    useClass: HttpsRequestInterceptor,
    multi: true,
    }],
  bootstrap: [AppComponent]
})
export class AppModule {

}
