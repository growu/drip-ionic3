import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage, ActionSheetController} from "ionic-angular";
import { ImagePicker } from '@ionic-native/image-picker';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';


@IonicPage({
  name:"goal-checkin",
  segment:"goal/:id/checkin"
})
@Component({
  selector: 'page-goal-checkin',
  templateUrl: 'goal-checkin.html',
})
export class GoalCheckinPage {

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private imagePicker: ImagePicker,
              private transfer: FileTransfer,
              private file: File,
              public camera: Camera,
              public actionSheetCtrl:ActionSheetController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GoalCheckinPage');
  }


  choosePic($event) {
      let actionSheet = this.actionSheetCtrl.create({
        title: '选择图片',
        buttons: [
          {
            text: '手机相册',
            role: 'destructive',
            handler: () => {
              console.log('Destructive clicked');
              this.pickImgFromAlbum();
            }
          },{
            text: '拍照上传',
            handler: () => {
              console.log('Archive clicked');
              this.pickImgFromCamera();

            }
          },{
            text: '取消',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          }
        ]
      });
      actionSheet.present();
  }

  pickImgFromAlbum() {
    var options = {
      maximumImagesCount:1
    };

    this.imagePicker.getPictures(options).then((results) => {
      console.log(results);
      if(results&&results.length>0){

                  let options: FileUploadOptions = {
                    fileKey: 'file',
                    fileName: "",
                    headers: {}
                  }

                  const fileTransfer: FileTransferObject = this.transfer.create();

                  fileTransfer.upload(results[0], '<api endpoint>', options)
                  .then((data) => {
                    // success
                  }, (err) => {
                    // error
                  });
      }
    }, (err) => {

    });
  }

  pickImgFromCamera() {
      const options: CameraOptions = {
          quality: 100,
          destinationType: this.camera.DestinationType.DATA_URL,
          encodingType: this.camera.EncodingType.JPEG,
          mediaType: this.camera.MediaType.PICTURE
      }

      this.camera.getPicture(options).then((imageData) => {
          // imageData is either a base64 encoded string or a file URI
          // If it's base64:
          let base64Image = 'data:image/jpeg;base64,' + imageData;
      }, (err) => {
          // Handle error
      });
  }

}
