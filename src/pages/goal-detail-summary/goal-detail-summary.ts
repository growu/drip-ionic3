import { Component } from '@angular/core';
import {NavController, NavParams, IonicPage} from "ionic-angular";

@IonicPage({
  name:"goal-detail-summary"
})
@Component({
  selector: 'page-goal-detail-summary',
  templateUrl: 'goal-detail-summary.html',
})
export class GoalDetailSummaryPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    console.log(this.navParams.data);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GoalDetailSummaryPage');
  }

}
