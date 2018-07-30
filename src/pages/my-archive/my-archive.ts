import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {UserProvider} from "../../providers/user/user";
import * as moment from 'moment'
import {DomSanitizer} from "@angular/platform-browser";

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
              private userProvider: UserProvider,
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

}
