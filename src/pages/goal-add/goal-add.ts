import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams,DateTime} from 'ionic-angular';

@IonicPage({
  name:'goal-add',
  segment:'goal/add'
})
@Component({
  selector: 'page-goal-add',
  templateUrl: 'goal-add.html',
})
export class GoalAddPage {
  @ViewChild('endDate') endDate: DateTime;


  public today: String = new Date().toISOString();

  public goal = {
    start_day: this.today,
    end_day: '',
    weeks:[],
  }


  constructor() {
  }

  ionViewDidLoad() {
  }

  onClearStartDate() {
    this.goal.start_day = this.today;
  }

  onClearEndDate() {
    this.goal.end_day = '';
  }

  onWeekChanged($event) {
    this.goal.weeks = $event;
  }


}
