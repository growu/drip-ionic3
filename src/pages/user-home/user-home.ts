import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import { UserProvider } from "./../../providers/user/user";


@IonicPage({
  name:'user-home',
  segment:'user/:id/home'
})
@Component({
  selector: 'page-user-home',
  templateUrl: 'user-home.html',
})
export class UserHomePage {

  public user:any = {};

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private userProvider: UserProvider) {
  }

  ionViewDidLoad() {

    this.userProvider.getUser(this.navParams.get('id')).then((data)=>{
      if(data) {
        this.user = data;
      }
    });
  }

}
