import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage({
    name: 'goal-detail-info',
    segment: 'goal/:id/info'
})
@Component({
  selector: 'page-goal-detail-info',
  templateUrl: 'goal-detail-info.html',
})
export class GoalDetailInfoPage {

    public goal:any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

      this.goal = this.navParams.get('goal');
  }

  ionViewDidLoad() {
  }

}
