import { Component } from '@angular/core';
import {App, IonicPage, NavController, NavParams} from 'ionic-angular';
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
              private app: App,
              public navParams: NavParams) {
    this.userId = this.navParams.get('id')

  }

  ionViewDidLoad() {
      this.userProvider.getUsersGoals(this.userId).then((data) => {
          this.goals = data;
      }).catch((err)=>{

      });
  }

  goGoalHomePage(id) {
      // this.navParams.get('rootNavCtrl').pop();
      this.navParams.get('rootNavCtrl').push('goal-home', {'id':id,'rootNavCtrl':this.navParams.get('rootNavCtrl')});
  }

}
