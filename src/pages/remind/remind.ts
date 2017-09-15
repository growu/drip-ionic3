import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams} from 'ionic-angular';

@IonicPage({
  name:'remind',
  segment:'remind'
})
@Component({
  selector: 'page-remind',
  templateUrl: 'remind.html',
})
export class RemindPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RemindPage');
  }

}
