import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage({
  name: 'goal-detail-menu'
})
@Component({
  selector: 'page-goal-detail-menu',
  templateUrl: 'goal-detail-menu.html',
})
export class GoalDetailMenuPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
  }

  goGoalSettingPage() {
    this.navCtrl.push('goal-setting',{id:1});
  }

}
