import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {GoalProvider} from "../../providers/goal/goal";

@IonicPage({
    name:'goal-member',
    segment:'goal/:id/member'
})
@Component({
  selector: 'page-goal-member',
  templateUrl: 'goal-member.html',
})
export class GoalMemberPage {

  public users;
  private per_page = 20;
  public is_audit = 1;

  constructor(public navCtrl: NavController,
              private alertCtrl: AlertController,
              private goalProvider: GoalProvider,
              public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.getGoalMembers(1);
  }

  getGoalMembers(page) {
    this.goalProvider.getGoalMember(this.navParams.get('id'),this.is_audit,page,this.per_page).then((data)=>{
      this.users = data;
    }).catch((err)=>{

    });
  }

    segmentChanged($event) {
        console.log(this.is_audit);
        this.getGoalMembers(1);
    }

    doAgree(user) {

      let param = {
        user_id:user.id,
          is_audit:1
      };

      this.goalProvider.doAudit(this.navParams.get('id'),param).then((data)=>{

      }).catch(err=>{

      });

    }

    doRefuse(user) {
        let prompt = this.alertCtrl.create({
            title: '提示',
            message: "请填写拒绝理由",
            inputs: [
                {
                    name: 'reason',
                    placeholder: ''
                },
            ],
            buttons: [
                {
                    text: '取消',
                    handler: data => {

                    }
                },
                {
                    text: '确定',
                    handler: data => {
                        let param = {
                            user_id:user.id,
                            is_audit:0,
                            reason:data
                        };

                        this.goalProvider.doAudit(this.navParams.get('id'),param).then((data)=>{

                        }).catch(err=>{

                        });

                    }
                }
            ]
        });
        prompt.present();
    }

}
