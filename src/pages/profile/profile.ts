import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, DateTime} from 'ionic-angular';
import { ImagePicker } from '@ionic-native/image-picker';


@IonicPage({
  name:'profile',
  segment:'profile'
})
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  public profile = {
    birthday:null,
    sex:"",
    nickname:"Jason.z"
  };

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private imagePicker: ImagePicker) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

  onClearBirthday() {
    this.profile.birthday = null;
  }

}
