import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {UserProvider} from "../../providers/user/user";


@IonicPage({
    name:'goal-setting',
    segment:'goal/:id/setting'
})

@Component({
  selector: 'page-goal-setting',
  templateUrl: 'goal-setting.html',
})
export class GoalSettingPage {

  public goal:any;

  constructor(public navCtrl: NavController,
              private userProvider: UserProvider,
              public navParams: NavParams) {

      // this.goal = this.navParams.get('goal');

      this.userProvider.getGoalsInfo(this.navParams.get('id')).then((data) => {
          this.goal = data;
      }).catch((err) => {

      });
  }

  ionViewDidLoad() {

  }

}
