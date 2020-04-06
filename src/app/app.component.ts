import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  lancamento = false;
  pessoa = !this.lancamento;

  alteraPagina(pagina: string) {
    if (pagina === 'lancamentos') {
      this.lancamento = false;
      this.pessoa = true;
    }

    if (pagina === 'pessoas') {
      this.lancamento = true;
      this.pessoa = false;
    }

  }
}
