import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {GoalProvider} from "../../providers/goal/goal";

@IonicPage({
  name:'goal-search',
  segment:'goal/search'
})
@Component({
  selector: 'page-goal-search',
  templateUrl: 'goal-search.html',
})
export class GoalSearchPage {

  public goals = [];

  constructor(public navCtrl: NavController,
              private goalProvider: GoalProvider,
              private alertCtrl: AlertController,
              public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.getGoals();
  }

  getGoals() {
    this.goalProvider.getHotGoals().then(data=>{
      this.goals = data;
    }).catch(err=>{

    });
  }

  goGoalAddPage() {

      this.navCtrl.push('goal-create', {'type':1});


      // let alert = this.alertCtrl.create();
      // alert.setTitle('请选择目标类型');
      //
      // alert.addInput({
      //     type: 'radio',
      //     label: '个人目标',
      //     value: '1',
      //     checked: true
      // });
      //
      // alert.addInput({
      //     type: 'radio',
      //     label: '小组目标',
      //     value: '2'
      // });
      //
      // alert.addButton('取消');
      // alert.addButton({
      //     text: '确定',
      //     handler: data => {
      //         console.log(data);
      //         this.navCtrl.push('goal-create', {'type':data});
      //     }
      // });
      // alert.present();

  }

    goGoalHomePage(goal) {
        this.navCtrl.push('goal-home', {'id':goal.id,'rootNavCtrl':this.navCtrl});
    }


}
