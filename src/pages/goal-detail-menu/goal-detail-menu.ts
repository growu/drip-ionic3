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

  private goal:any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.goal = this.navParams.get('goal');
  }

  ionViewDidLoad() {
  }

  goGoalSettingPage() {
    this.navCtrl.push('goal-edit',{id:this.goal.id});
  }

}
