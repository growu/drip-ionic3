import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage({
  name: 'goal-setting',
  segment: 'goal/:id/setting'
})
@Component({
  selector: 'page-goal-setting',
  templateUrl: 'goal-setting.html',
})
export class GoalSettingPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GoalSettingPage');
  }

}
