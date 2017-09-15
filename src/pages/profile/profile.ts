import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, DateTime} from 'ionic-angular';
import { ImagePicker } from '@ionic-native/image-picker';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { Crop } from '@ionic-native/crop';

import * as citise from '../../assets/chinese-cities.json';

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
    avatar:'',
    birthday:null,
    sex:"",
    nickname:"Jason.z"
  };

  cityColumns: any[];


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private crop: Crop,
              private imagePicker: ImagePicker,
              private transfer: FileTransfer,
              private file: File) {

    this.cityColumns = <any>citise;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

  onClearBirthday() {
    this.profile.birthday = null;
  }

  onChangeAvatar() {
    var options = {
      maximumImagesCount:1
    };

    this.imagePicker.getPictures(options).then((results) => {
      console.log(results);
      if(results&&results.length>0){
        this.crop.crop(results[0], {quality: 75})
            .then((newImage) =>{
                  console.log('new image path is: ' + newImage);

                  let options: FileUploadOptions = {
                    fileKey: 'file',
                    fileName: "",
                    headers: {}
                  }

                  const fileTransfer: FileTransferObject = this.transfer.create();

                  fileTransfer.upload(newImage, '<api endpoint>', options)
                      .then((data) => {
                        // success
                      }, (err) => {
                        // error
                      })

                } ,
                (error) => {
                  console.error('Error cropping image', error);
                }
            );


        this.profile.avatar = results[0];
      }
    }, (err) => {

    });
  }

}
