import { Component } from '@angular/core';
import {NavController, NavParams, IonicPage} from "ionic-angular";
import { UserProvider } from '../../providers/user/user'

@IonicPage({
  name:"goal-detail-summary"
})
@Component({
  selector: 'page-goal-detail-summary',
  templateUrl: 'goal-detail-summary.html',
})
export class GoalDetailSummaryPage {

  goal:any = {};

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private userProvider: UserProvider) {
    console.log(this.navParams.data);
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
