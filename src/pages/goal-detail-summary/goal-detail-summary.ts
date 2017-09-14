import { Component } from '@angular/core';
import {NavController, NavParams, IonicPage} from "ionic-angular";

/**
 * Generated class for the GoalDetailSummaryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage({
  name:"goal-detail-summary"
})
@Component({
  selector: 'page-goal-detail-summary',
  templateUrl: 'goal-detail-summary.html',
})
export class GoalDetailSummaryPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GoalDetailSummaryPage');
  }

}
