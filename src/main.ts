import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

declare let globalNonce: string;


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

  // platformBrowserDynamic().bootstrapModule(AppModule)
  // .catch(err => console.error(err))
  // .finally(() => {
  //   debugger;
  //   const nonceElement = document.getElementById('nonce-script');
  //   if (nonceElement && nonceElement.getAttribute('nonce')) {
  //     globalNonce = nonceElement.getAttribute('nonce')!;
  //   } else {
  //     // Handle the case where nonce is not available
  //     globalNonce = '';
  //   }
  // });
