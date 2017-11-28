import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {UserProvider} from "../../providers/user/user";

@IonicPage({
    name:'user-home-photos',
    segment:'photos'
})
@Component({
  selector: 'page-user-home-photos',
  templateUrl: 'user-home-photos.html',
})
export class UserHomePhotosPage {

    public photos:any = [];
    public userId:any = null;

  constructor(public navCtrl: NavController,
              public userProvider: UserProvider,
              public navParams: NavParams) {
      this.userId = this.navParams.get('id')

  }

  ionViewDidLoad() {
      this.userProvider.getUserPhotos(this.userId).then((data) => {
          this.photos = data;
      }).catch((err)=>{

      });
  }

}
