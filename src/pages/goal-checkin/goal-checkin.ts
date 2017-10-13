import {Component} from '@angular/core';
import {App, NavController, NavParams, IonicPage, ActionSheetController} from "ionic-angular";
import {Validators, FormBuilder, FormGroup} from '@angular/forms';
import {ImagePicker} from '@ionic-native/image-picker';
import {Camera, CameraOptions} from '@ionic-native/camera';
import {FileTransfer, FileUploadOptions, FileTransferObject} from '@ionic-native/file-transfer';
import {File} from '@ionic-native/file';
import {UserProvider} from "../../providers/user/user";


@IonicPage({
    name: "goal-checkin",
    segment: "goal/:id/checkin"
})
@Component({
    selector: 'page-goal-checkin',
    templateUrl: 'goal-checkin.html',
})
export class GoalCheckinPage {

    private checkinForm: FormGroup;

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public app: App,
                private imagePicker: ImagePicker,
                private transfer: FileTransfer,
                private file: File,
                public camera: Camera,
                public actionSheetCtrl: ActionSheetController,
                private formBuilder: FormBuilder,
                private  userProvider: UserProvider) {

        this.checkinForm = this.formBuilder.group({
            'content': ['', []],
        });
    }

    ionViewDidLoad() {

    }

    doCheckin($event) {
        $event.preventDefault();

        let goal_id = this.navParams.get('id');

        let body = this.checkinForm.value;

        if (this.navParams.get('day')) {
            body.day = this.navParams.get('day');
        }

        this.userProvider.checkinGoal(goal_id, body).then(data => {
            if (data) {
                //this.navCtrl.push('goal-detail-summary', {id: goal_id});
                this.navCtrl.push('goal-detail',{id:goal_id});
                // this.app.getRootNavs()[0].push('goal-detail',{id:goal_id});
            }
        });
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
                }, {
                    text: '拍照上传',
                    handler: () => {
                        console.log('Archive clicked');
                        this.pickImgFromCamera();

                    }
                }, {
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
            maximumImagesCount: 1
        };

        this.imagePicker.getPictures(options).then((results) => {
            console.log(results);
            if (results && results.length > 0) {

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
