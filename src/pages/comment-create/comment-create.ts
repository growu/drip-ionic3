import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';

@IonicPage({
    name:'comment-create'
})
@Component({
  selector: 'page-comment-create',
  templateUrl: 'comment-create.html',
})
export class CommentCreatePage {

  public content:any;

  constructor(public navCtrl: NavController,
              public viewCtrl: ViewController,
              public navParams: NavParams) {
    console.log(this.navParams);
  }

  ionViewDidLoad() {

  }

  doComment() {
    // 根据provider 提交
    this.viewCtrl.dismiss(null);
  }

  dismiss() {
    this.viewCtrl.dismiss(null);
  }

}
