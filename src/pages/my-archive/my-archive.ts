import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import {UserProvider} from "../../providers/user/user";
import * as moment from 'moment'
import {DomSanitizer} from "@angular/platform-browser";
import {ToastProvider} from '../../providers/toast/toast'

@IonicPage({
    name: 'my-archive',
    segment:'my/archive'
})
@Component({
  selector: 'page-my-archive',
  templateUrl: 'my-archive.html',
})
export class MyArchivePage {

    public goals;

  constructor(public navCtrl: NavController,
              private sanitizer: DomSanitizer,
              private alertCtrl: AlertController,
              private userProvider: UserProvider,
                private toastProvider: ToastProvider,
              public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.getGoals();
  }

  getGoals() {

      let date = moment().format("YYYY-MM-DD");

      this.userProvider.getGoals(date,"1").then((data) => {
          this.goals = data;
      }).catch((err)=>{

      })
  }

    getColor(color:string) {

        console.log(color);

        return this.sanitizer.bypassSecurityTrustStyle('background-color:' + color);
    }

    goGoalHistoryPage(goal) {
        this.navCtrl.push('goal-history', {id: goal.id, goal: goal})
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
                        this.userProvider.deleteGoal(goal.id).then((data) => {
                            this.toastProvider.show("删除成功", 'success');
                            var index = this.goals.indexOf(goal);
                            this.goals.splice(index, 1);
                        }, () => {
                        }).catch((err) => {
                        });
                    }
                }
            ]
        });
        confirm.present();
    }

}
