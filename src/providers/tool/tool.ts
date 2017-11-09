import {Injectable, SkipSelf} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {ActionSheetController, LoadingController} from "ionic-angular";
import {FileTransfer, FileTransferObject, FileUploadOptions} from '@ionic-native/file-transfer';
import {Camera, CameraOptions} from '@ionic-native/camera';
import {ToastProvider} from "../toast/toast";
import {ImagePicker} from "@ionic-native/image-picker";
import {Storage} from '@ionic/storage';
import {Crop} from "@ionic-native/crop";

@Injectable()
export class ToolProvider {

    constructor(public http: Http,
                public actionSheetCtrl: ActionSheetController,
                private imagePicker: ImagePicker,
                private transfer: FileTransfer,
                private toastProvider: ToastProvider,
                private storage: Storage,
                private crop: Crop,
                private loadingCtrl: LoadingController,
                public camera: Camera,) {
    }

    choosePic($event): Promise<any> {

        return new Promise((resolve, reject) => {

            let actionSheet = this.actionSheetCtrl.create({
                title: '选择图片',
                buttons: [
                    {
                        text: '相册',
                        role: 'destructive',
                        handler: () => {
                            var options = {
                                maximumImagesCount: 1,
                                title:"选择相册"
                            };

                            this.imagePicker.getPictures(options).then((results) => {
                                if (results && results.length > 0) {
                                    this.crop.crop(results[0], {quality: 75})
                                        .then(
                                            newImage => {
                                                this.uploadImage(newImage).then((ret) => {
                                                    resolve(ret);
                                                }).catch((err) => {
                                                    reject(err);
                                                });
                                            },
                                            (error) => {
                                                reject(error);
                                                this.toastProvider.show(error, 'error');
                                            }
                                        );

                                } else {
                                    reject("未选择图片");
                                }
                            }, (err) => {
                                this.toastProvider.show(err, 'error');
                                reject(err);
                            });
                        }
                    }, {
                        text: '相机',
                        handler: () => {
                            const options: CameraOptions = {
                                quality: 100,
                                destinationType: this.camera.DestinationType.FILE_URI,
                                encodingType: this.camera.EncodingType.JPEG,
                                mediaType: this.camera.MediaType.PICTURE,
                                allowEdit: true
                            }

                            this.camera.getPicture(options).then((imageData) => {
                                this.uploadImage(imageData).then((ret) => {
                                    resolve(ret);
                                }).catch((err) => {
                                    reject(err);
                                })
                            }, (err) => {
                                this.toastProvider.show(err, 'error');
                                reject(err);
                            });
                        }
                    }, {
                        text: '取消',
                        role: 'cancel',
                        handler: () => {
                            reject("取消上传");
                        }
                    }
                ]
            });
            actionSheet.present();
        });
    }

    uploadImage(fileUrl): Promise<any> {

        return new Promise((resolve, reject) => {

            this.storage.get("token").then(token => {
                let options: FileUploadOptions = {
                    fileKey: 'file',
                    fileName: fileUrl.substr(fileUrl.lastIndexOf('/') + 1),
                    headers: {"Authorization": 'Bearer ' + token, "Accept": 'application/x.drip.v2+json'}
                }

                let loading = this.loadingCtrl.create({
                    content: "图片上传中,请稍候...",
                    dismissOnPageChange: true,
                    showBackdrop: false,
                    duration: 10000
                });

                loading.present();

                const fileTransfer: FileTransferObject = this.transfer.create();

                fileTransfer.upload(fileUrl, 'http://drip.growu.me/api/upload/image', options)
                    .then((res) => {
                        loading.dismiss();
                        var result = JSON.parse(res.response);
                        resolve(result);
                    }, (err) => {
                        loading.dismiss();
                        reject(err.json().message);
                        this.toastProvider.show(err.json().message, 'error');
                    });
            }).catch((err) => {
                reject(err);
            });
        });

    }
}

