import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {ToastProvider} from "../../providers/toast/toast";

@IonicPage({
    name:'goal-manage',
    segment:'goal/:id/manage'
})
@Component({
  selector: 'page-goal-manage',
  templateUrl: 'goal-manage.html',
})
export class GoalManagePage {

  constructor(public navCtrl: NavController,
              private toastProvider: ToastProvider,
              public navParams: NavParams) {
  }

  ionViewDidLoad() {
  }

  goGoalEditPage() {
        this.navCtrl.push('goal-edit',{id:this.navParams.get('id')});
  }

    goGoalMemberPage() {
    this.navCtrl.push('goal-member',{id:this.navParams.get('id')});
    }

    goGoalEventPage() {
        this.navCtrl.push('goal-event',{id:this.navParams.get('id')});
    }

    showMore() {
      this.toastProvider.show("敬请期待","warning");
    }

}
