import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, DateTime} from 'ionic-angular';
import {ImagePicker} from '@ionic-native/image-picker';
import {FileTransfer, FileUploadOptions, FileTransferObject} from '@ionic-native/file-transfer';
import {Crop} from '@ionic-native/crop';
import {Storage} from '@ionic/storage';
import * as citise from '../../assets/chinese-cities.json';
import {ToastProvider} from "../../providers/toast/toast";
import {UserProvider} from "../../providers/user/user";
import {LoadingController} from 'ionic-angular';

@IonicPage({
    name: 'profile',
    segment: 'profile'
})
@Component({
    selector: 'page-profile',
    templateUrl: 'profile.html',
})
export class ProfilePage {

    public user = {
        id: 0,
        avatar_url: '',
        birthday: null,
        sex: "",
        nickname: "",
        signature: ""
    };

    cityColumns: any[];

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                private storage: Storage,
                private crop: Crop,
                private imagePicker: ImagePicker,
                private toastProvider: ToastProvider,
                private userProvider: UserProvider,
                private loadingCtrl: LoadingController,
                private transfer: FileTransfer) {

        this.cityColumns = <any>citise;
    }

    ionViewDidLoad() {
        this.storage.get('user').then((data) => {
            console.log(data);
            this.user = data;
        });
    }

    onClearBirthday() {
        this.user.birthday = null;
    }

    onChangeAvatar() {
        var options = {
            maximumImagesCount: 1
        };

        this.imagePicker.getPictures(options).then((results) => {
            console.log(results);
            if (results && results.length > 0) {
                this.crop.crop(results[0], {quality: 75})
                    .then((newImage) => {
                            console.log('new image path is: ' + newImage);
                            this.uploadImage(newImage);
                        },
                        (error) => {
                            console.error('Error cropping image', error);
                        }
                    );
            }
        }, (err) => {
            this.toastProvider.show(err.json().message, 'error');
        });
    }

    uploadImage(fileUrl) {

        let loading = this.loadingCtrl.create({
            content: "头像上传中,请稍候...",
            dismissOnPageChange: true,
            showBackdrop: false,
            duration: 10000
        });

        loading.present();// 弹出load框

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
                    this.updateUser('user_avatar', result.url);
                    loading.dismiss();
                }, (err) => {
                    console.log(err);
                    loading.dismiss();
                    this.toastProvider.show(err.json().message, 'error');

                });
        });
    }


    updateUser(key, value) {

        let param = {};
        param[key] = value;

        let body = JSON.stringify(param);

        this.userProvider.updateUser(this.user.id, body).then((data) => {
            this.user = data;
            this.storage.set("user", data);

        }).catch((err) => {

        });
    }


}
