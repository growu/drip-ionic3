import { Component } from '@angular/core';
import {NavController, NavParams, IonicPage} from "ionic-angular";

/**
 * Generated class for the GoalDetailEventPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage({
  name:"goal-detail-event"
})

@Component({
  selector: 'page-goal-detail-event',
  templateUrl: 'goal-detail-event.html',
})
export class GoalDetailEventPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GoalDetailEventPage');
  }

}
