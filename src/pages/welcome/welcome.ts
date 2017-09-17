import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams} from 'ionic-angular';

@IonicPage({
  name:'welcome',
})
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {

    let timeoutId = setTimeout(() => {
      this.navCtrl.push('main');
    }, 2000);

  }

}
