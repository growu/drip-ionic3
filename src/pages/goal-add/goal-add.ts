import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Storage} from '@ionic/storage';
import {ToastProvider} from '../../providers/toast/toast'

@IonicPage({
    name: 'goal-add',
  segment:'goal/add'
})
@Component({
  selector: 'page-goal-add',
  templateUrl: 'goal-add.html',
})
export class GoalAddPage {
  public type:number = 1;
  public user: any = {};

  constructor(public navCtrl: NavController,
    private storage: Storage,
    private toastProvider: ToastProvider,
     public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.storage.get('user').then((data) => {
        this.user = data;
    });
  }

  changeType(type) {
    this.type = type;
  }

  goCreate(){
    if(this.type == 1) {
      this.navCtrl.push('goal-search');
    } else {
      if(this.user.vip_type != 2) {
          this.toastProvider.show("团队目标仅限TEAM会员使用", 'error');
          return;
      }

      this.navCtrl.push('goal-create', {'type':this.type});
    }
  }

}
