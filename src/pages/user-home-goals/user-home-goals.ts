import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {UserProvider} from "../../providers/user/user";

@IonicPage({
    name:'user-home-goals',
    segment:'goals'
})
@Component({
  selector: 'page-user-home-goals',
  templateUrl: 'user-home-goals.html',
})
export class UserHomeGoalsPage {

    public goals:any = [];
    public userId:any = null;

  constructor(public navCtrl: NavController,
              public userProvider: UserProvider,
              public navParams: NavParams) {
    this.userId = this.navParams.get('id')

  }

  ionViewDidLoad() {

      this.userProvider.getUserGoals(this.userId).then((data) => {
          this.goals = data;
      }).catch((err)=>{

      });
  }

  goGoalHomePage() {
      this.navCtrl.push("goal-home");
  }

}
