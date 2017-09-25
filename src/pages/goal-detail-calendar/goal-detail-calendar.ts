import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage({
  name: 'goal-calendar',
  segment: 'goal/:id/calendar'
})
@Component({
  selector: 'page-goal-detail-calendar',
  templateUrl: 'goal-detail-calendar.html',
})
export class GoalDetailCalendarPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GoalDetailCalendarPage');
  }

}
