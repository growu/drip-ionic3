import {Component} from '@angular/core';
import {App, NavController, NavParams, IonicPage, ActionSheetController} from "ionic-angular";
import {FormBuilder, FormGroup} from '@angular/forms';
import {ImagePicker} from '@ionic-native/image-picker';
import {Camera, CameraOptions} from '@ionic-native/camera';
import {FileTransfer, FileUploadOptions, FileTransferObject} from '@ionic-native/file-transfer';
import {UserProvider} from "../../providers/user/user";
import {ToastProvider} from "../../providers/toast/toast";
import {Storage} from '@ionic/storage';


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
    public attachs: any = [];

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public app: App,
                private storage: Storage,
                private imagePicker: ImagePicker,
                private transfer: FileTransfer,
                public camera: Camera,
                public actionSheetCtrl: ActionSheetController,
                private formBuilder: FormBuilder,
                private  userProvider: UserProvider,
                private toastProvider: ToastProvider) {

        console.log(this.navParams);

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

        body.attachs = this.attachs;

        this.userProvider.checkinGoal(goal_id, body).then(data => {
            if (data) {
                this.navCtrl.pop();
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
                        this.pickImgFromAlbum();
                    }
                }, {
                    text: '拍照上传',
                    handler: () => {
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
                this.uploadImage(results[0]);
            }
        }, (err) => {
            this.toastProvider.show(err, 'error');
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
            console.log(base64Image);
            this.uploadImage(base64Image);
        }, (err) => {
            // Handle error
            this.toastProvider.show(err, 'error');
        });
    }


    uploadImage(fileUrl) {
        this.storage.get("token").then(token => {
            let options: FileUploadOptions = {
                fileKey: 'file',
                fileName: fileUrl.substr(fileUrl.lastIndexOf('/') + 1),
                headers: {"Authorization": 'Bearer ' + token, "Accept": 'application/x.drip.v2+json'}
            }

            const fileTransfer: FileTransferObject = this.transfer.create();

            fileTransfer.upload(fileUrl, 'http://drip.growu.me/api/upload/image', options)
                .then((res) => {
                    console.log(res);
                    var result = JSON.parse(res.response);
                    this.attachs[0] = result;
                }, (err) => {
                    console.log(err);
                    this.toastProvider.show(err.json().message, 'error');
                });
        });
    }

    removeAttach($event) {
        $event.preventDefault();
        this.attachs = [];
    }

}
