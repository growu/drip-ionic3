import { Component } from '@angular/core';
import {NavController, NavParams, IonicPage} from "ionic-angular";
import { UserProvider } from '../../providers/user/user'

/**
 * Generated class for the GoalDetailEventPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage({
  name:"goal-detail-event"
})

@Component({
  selector: 'page-goal-detail-event',
  templateUrl: 'goal-detail-event.html',
})
export class GoalDetailEventPage {

  events:any = [];
  private page:number = 1;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private userProvider: UserProvider) {
  }

  ionViewDidLoad() {
    this.getGoalEvents();
  }

  getGoalEvents() {
    let id = this.navParams.data.id;
    this.userProvider.getGoalEvents(id).then((data)=>{
      if(data) {
          if(this.page == 1){
            this.events = data;
          } else {
            this.events.concat(data);
          }
      }
    });
  }

}
