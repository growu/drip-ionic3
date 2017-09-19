import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SuperTabsController } from "ionic2-super-tabs/dist/index";

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
  goalId:number;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private superTabsCtrl: SuperTabsController) {

    this.goalId = this.navParams.get('go');
  }

  ionViewDidLoad() {
    console.log("goal detail tabs page");
    // this.navParams.get("homePage").getGoals();
  }

}
