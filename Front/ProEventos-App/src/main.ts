import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

//Se for um ambiente de producao habiliar o "enableProdMode"
if (environment.production) {
  enableProdMode();
}

//Startando o "AppModule" esse e meu arquivo principal havendo um erro
//sera enviado para cath para o console
  platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

