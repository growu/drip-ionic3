import { Component, ViewChild } from '@angular/core';
import { NavController, Tabs, IonicPage, PopoverController, AlertController, ToastController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user'

import { SettingModel } from '../../models/setting.model'
import * as moment from 'moment'

@IonicPage({
  name:'home',
  segment:'home'
})
@Component({
  templateUrl: 'home.html'
})
export class HomePage {
  public viewTitle:string = "今天";
  public setting:SettingModel;
  public remindTime;
  public goals:any[];

  constructor(public navCtrl: NavController,
              private popoverCtrl: PopoverController,
              private userProvider:UserProvider,
              private alertCtrl: AlertController,
              private toastCtrl: ToastController
  ) {


  }

  ngAfterViewInit() {

  }


  ionViewDidLoad() {
    this.userProvider.getSetting().then((settingData) => {
      console.log(settingData);
      if(settingData) {
        this.setting = settingData;
      } else {
        this.setting = this.userProvider.getDefaultSetting();
      }
    });

    let today = moment().format("YYYY-MM-DD");
    this.getGoals(today);
  }

  getGoals(date) {
    this.userProvider.getGoals(date).then((data)=>{
      console.log(data);
      this.goals =  data;
    });
  }

  onViewTitleChanged(title) {
    this.viewTitle = title;
  }

  onDaySelected(day) {
    this.getGoals(moment(day).format("YYYY-MM-DD"));
  }

  goGoalAddPage() {
    this.navCtrl.push('goal-create',{});
  }

  goGoalDetailPage(id) {
    this.navCtrl.push('goal-detail',{'id':id,'homePage':this});
  }

  goGoalCheckinPage(id) {
    this.navCtrl.push('goal-checkin',{'id':id,'homePage':this});
  }

  deleteGoal(goal) {
    let confirm = this.alertCtrl.create({
      title: '确认删除?',
      message: '此项操作将会清空该目标下的所有数据，请谨慎操作！',
      buttons: [
        {
          text: '取消',
          handler: () => {
          }
        },
        {
          text: '确认',
          cssClass: 'my-alert-danger',
          handler: () => {
            this.userProvider.deleteGoal(goal.id).then((data)=>{
              if(data) {
                let toast = this.toastCtrl.create({
                  message: '删除成功',
                  duration: 3000,
                  position: 'top',
                  cssClass: 'my-toast'
                });
                toast.present();

                var index = this.goals.indexOf(goal);
                this.goals.splice(index,1);
              }
            });
          }
        }
      ]
    });
    confirm.present();
  }

  setRemindTime(goal,$event) {
    console.log($event);

    let param = {
      remind_time:goal.remind_time,
      is_push:1
    };

    let body = JSON.stringify(param);

    this.userProvider.updateGoal(goal.id,body).then((data)=>{
        if(data) {
          let toast = this.toastCtrl.create({
            message: '设置成功',
            duration: 3000,
            position: 'top',
            cssClass: 'my-toast'
          });
          toast.present();
        }
    });
  }

  openMenu($event) {
    let popover = this.popoverCtrl.create('home-menu', {
      viewMode:this.setting.viewMode,
      calendarMode:this.setting.calendarMode,
    },{
      showBackdrop:true,
    });

    popover.present({
      ev: $event
    });

    popover.onDidDismiss((settingData) => {
      if(settingData) {
        this.setting = settingData;
        this.userProvider.updateSetting(this.setting);
      }
    })
  }

  // doRefresh(refresher) {
  //   console.log('Begin async operation', refresher);
  //
  //   setTimeout(() => {
  //     console.log('Async operation has ended');
  //     refresher.complete();
  //   }, 2000);
  // }


}
