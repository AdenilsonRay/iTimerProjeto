//Importrando os arquivos que seram usados suas variaeis e executados suas funcoes,
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

//Se for definido no arquivo "evironment.ts" que foi ja importado acima na lista de variaveis de ambiente
//que a variavel "production" é true habilitar o modo producao
if (environment.production) {
  enableProdMode();
}

//Usar esse item importado acima que fica observando dinamicamente o "AppModule"
//Se houver qualquer erro no processo que dispare um "catch" sera enviado para o console
//E o console sera marcado como que possui um erro que esta sendo passado.
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
