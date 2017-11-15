import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage({
    name:'user-home-goals',
    segment:'goals'
})
@Component({
  selector: 'page-user-home-goals',
  templateUrl: 'user-home-goals.html',
})
export class UserHomeGoalsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
  }

}
