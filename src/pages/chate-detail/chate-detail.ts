import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ChateDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name:'chart-detail',
  segment:'chart/detail'
})
@Component({
  selector: 'page-chate-detail',
  templateUrl: 'chate-detail.html',
})
export class ChateDetailPage {

  public msgList:Array<any> = [{
    userId:1,
    userName:'Jason.z',
    message:'fdas32rfadsfads',
    time:'3分钟前'
  }];

  public toUser = {
    id:1
  };

  public user = {
    id:2
  };

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChateDetailPage');
  }

}
