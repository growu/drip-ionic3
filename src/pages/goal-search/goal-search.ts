import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';

@IonicPage({
  name:'page-goal-search',
  segment:'goal/search'
})
@Component({
  selector: 'page-goal-search',
  templateUrl: 'goal-search.html',
})
export class GoalSearchPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GoalSearchPage');
  }

}
