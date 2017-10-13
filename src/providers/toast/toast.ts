import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';
import 'rxjs/add/operator/map';

@Injectable()
export class ToastProvider {

  constructor( public toastCtrl: ToastController,) {
  }

  show(message,type) {
      let toast = this.toastCtrl.create({
          message: message,
          duration: 3000,
          position: 'top',
          cssClass: 'my-toast my-toast-'+type
      });

      toast.present();
  }

}
