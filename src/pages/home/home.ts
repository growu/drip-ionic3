import { Component,ViewChild } from '@angular/core';
import { NavController,Tabs,IonicPage } from 'ionic-angular';

@IonicPage({
  name:'home',
  segment:'home'
})
@Component({
  templateUrl: 'home.html'
})
export class HomePage {
  viewTitle;

  constructor(public navCtrl: NavController) {

  }

  onViewTitleChanged(title) {
    console.log(title);
    this.viewTitle = title;
  }

  onDaySelected(day) {
    console.log(day);
  }

  goGoalAddPage() {
    this.navCtrl.push('goal-add',{});
  }

  goGoalDetailPage() {
    this.navCtrl.push('setting',{});
  }

}
