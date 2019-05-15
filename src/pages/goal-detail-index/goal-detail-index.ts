import { Component } from '@angular/core';
import {App, IonicPage, NavController, NavParams} from 'ionic-angular';
import {UserProvider} from "../../providers/user/user";

@IonicPage({
    name: "goal-detail-index",
    segment: "index"
})
@Component({
  selector: 'page-goal-detail-index',
  templateUrl: 'goal-detail-index.html',
})
export class GoalDetailIndexPage {
      public goal: any = {};
      public data: any = {
          items:[]
      };

        public checkins:any = [];


      constructor(public navCtrl: NavController,
                  private userProvider: UserProvider,
                  private app: App,
                  public navParams: NavParams) {

          this.goal = this.navParams.data.goal;

          if(!this.goal) {
              this.navCtrl.popToRoot();
          }
      }

      ionViewDidEnter() {
            this.getGoalsToday();
      }

      getGoalsToday() {
           this.userProvider.getGoalsToday(this.goal.id).then(data=>{
               this.data = data;
               console.log(this.data);
           });
      }

    /**
     * 进入打卡页面
     */
    goCheckinPage() {
        this.app.getRootNav().push('goal-checkin', {id: this.goal.id, goal: this.goal})
      }

}
