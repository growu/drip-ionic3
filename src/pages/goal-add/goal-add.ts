import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams,DateTime} from 'ionic-angular';
import { DatePicker } from '@ionic-native/date-picker';

/**
 * Generated class for the GoalAddPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
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
  }


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private datePicker: DatePicker) {
  }

  ionViewDidLoad() {
  }

  onClearStartDate() {
    this.goal.start_day = this.today;
  }

  onClearEndDate() {
    this.goal.end_day = '';
    this.endDate._text = '无';
  }


}
