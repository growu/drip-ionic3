import { Injectable } from '@angular/core';

import { LoadingController } from 'ionic-angular';


@Injectable()
export class LoadingProvider {

  constructor(public loadingCtrl: LoadingController) {
  }

  show(message,type) {
      const loading = this.loadingCtrl.create({
          spinner: 'hide',
          content: `
    <ion-icon name="checkmark-circle" color="secondary"></ion-icon>`+message,
          //duration: 5000
      });

      loading.onDidDismiss(() => {
          console.log('Dismissed loading');
      });

      loading.present();
  }


}
