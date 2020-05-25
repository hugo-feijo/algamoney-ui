import { JwtHelperService, JWT_OPTIONS, JwtModule } from '@auth0/angular-jwt';
import { SecurityModule } from './seguranca/security.module';
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

export function tokenGetter() {
  return localStorage.getItem('access_token');
}

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
    AppRoutingModule,

    // JwtModule.forRoot({
    //   config: {
    //     tokenGetter: tokenGetter,
    //     whitelistedDomains: ['localhost:8080'],
    //     blacklistedRoutes: []
    //   }
    // })
  ],
  providers: [
    LancamentoService,
    PessoaService,
    CategoriaService,
    MessageService,
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService,
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
