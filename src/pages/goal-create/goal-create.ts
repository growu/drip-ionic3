import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController,DateTime} from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { GoalProvider } from "./../../providers/goal/goal";
import * as moment from 'moment'

@IonicPage({
  name:'goal-create',
  segment:'goal/create'
})
@Component({
  selector: 'page-goal-create',
  templateUrl: 'goal-create.html',
})
export class GoalCreatePage {
  @ViewChild('endDate') endDate: DateTime;

  public today: String = new Date().toISOString();

  public goal = {
    start_day: this.today,
    end_day: '',
    weeks:[],
  }

  private goalCreateForm: FormGroup;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public toastCtrl: ToastController,
              private formBuilder: FormBuilder,
              private goalProvider: GoalProvider
             ) {

    this.goalCreateForm = this.formBuilder.group({
      'name': ['', [Validators.required,Validators.maxLength(32)]],
      'desc': ['', [Validators.required,Validators.maxLength(255)]],
      'start_date':["",[]],
      'end_date':['',[]],
      'is_public':[true,[]],
      'remind_time':['',[]]
    });
  }

  ionViewDidLoad() {
  }

  onClearEndDate() {
    this.goal.end_day = '';
  }

  onWeekChanged($event) {
    this.goal.weeks = $event;
  }

  doCreateGoal() {
    this.goalProvider.createGoal(this.goalCreateForm.value).then(data => {
      if(data) {
        let toast = this.toastCtrl.create({
          message: "创建成功，开始打卡吧！",
          duration: 3000,
          position: 'middle',
          showCloseButton: true,
          closeButtonText: '关闭'
        });

        toast.present();
        this.navCtrl.push('goal-detail',{id:data.goal_id});
      }
    });
  }


}
