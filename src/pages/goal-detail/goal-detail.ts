import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SuperTabsController } from "ionic2-super-tabs/dist/index";
import { UserProvider } from '../../providers/user/user'

@IonicPage({
  name:"goal-detail"
})
@Component({
  selector: 'page-goal-detail',
  templateUrl: 'goal-detail.html',
})
export class GoalDetailPage {

  page1: any = "goal-detail-summary";
  page2: any = "goal-detail-event";
  page3: any = "goal-detail-chart";

  goal:any = {};

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private userProvider: UserProvider,
              private superTabsCtrl: SuperTabsController) {
  }

  getGoal() {
    let id = this.navParams.data.id;
    this.userProvider.getGoal(id).then((data)=>{
      this.goal = data;
    });
  }

  ionViewDidLoad() {
    this.getGoal();
  }

}
