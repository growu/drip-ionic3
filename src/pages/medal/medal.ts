import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import swal from "sweetalert2";



@IonicPage({
  name: 'medal',
  segment: 'medal'
})
@Component({
  selector: 'page-medal',
  templateUrl: 'medal.html',
})
export class MedalPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MedalPage');
    this.showMedalDetail();
  }

  showMedalDetail() {
      swal({ 
      title: '总打卡30天', 
      text: '2019-01-01 获得',
      imageUrl: '../assets/medal/AMAllDays_01@3x.png',
      imageWidth: 200,
      imageHeight: 100,
      animation: false,
      confirmButtonText:"分享",
      padding: 100
    })

  }

}
