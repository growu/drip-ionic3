import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {UserProvider} from "../../providers/user/user";
import {Storage} from '@ionic/storage';
import {ToastProvider} from "../../providers/toast/toast";
import {ToolProvider} from "../../providers/tool/tool";
import swal from "sweetalert2";

@IonicPage({
    name:"goal-checkin-edit",
    segment:"goal/:goalId/checkin/:checkinId/edit"
})
@Component({
  selector: 'page-goal-checkin-edit',
  templateUrl: 'goal-checkin-edit.html',
})
export class GoalCheckinEditPage {

    public goal;
    public min;
    public user;
    public attaches;
    public checkin = {
        id:null,
        day:null,
        items:[],
        content:null,
        attachs:[]
    };

  constructor(public navCtrl: NavController,
              private userProvider: UserProvider,
              private storage: Storage,
              private toolProvider: ToolProvider,
              public navParams: NavParams) {
  }

  ionViewDidLoad() {
      let goal_id = this.navParams.get('goalId');
      let checkin_id = this.navParams.get('checkinId');

      this.userProvider.getGoalsInfo(goal_id).then((data) => {
          this.goal = data;
          this.min = data.start_date;
      }).catch((err) => {

      });

      this.userProvider.getCheckin(checkin_id).then((data) => {
          this.checkin = data;
      }).catch((err) => {

      });

      this.storage.get('user').then((data) => {
          this.user = data;
      });
  }

    doCheckin($event) {
        $event.preventDefault();

        let params = {
            day: this.checkin.day,
            content: this.checkin.content,
            items: this.checkin.items,
            attachs: this.checkin.attachs,
        };

        this.userProvider.updateCheckin(this.checkin.id, params).then(data => {
            if (data) {
                swal({
                    title: '修改成功',
                    type: 'success',
                    // timer: 4000,
                    showConfirmButton: true,
                    confirmButtonText:'分享打卡',
                    // width: '80%',
                    padding: 0
                }).then((result) => {
                    if(result.value) {
                       this.navCtrl.pop();
                    }
                }, dismiss => {
                    this.navCtrl.pop();
                });
            }
        });
    }

    choosePic($event) {
        this.toolProvider.choosePic($event).then((ret) => {
            this.checkin.attachs[0] = ret;
        }).catch((err) => {

        });
    }

    removeAttach($event) {
        $event.preventDefault();
        this.checkin.attachs = [];
    }

    deleteItem(item, $event) {
        let index = this.goal.items.indexOf(item);
        console.log(index);
        if (index >= 0) {
            this.goal.items.splice(index, 1);
        }
    }

}
