import {Injectable, SkipSelf} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {ActionSheetController, LoadingController, Platform} from "ionic-angular";
import {FileTransfer, FileTransferObject, FileUploadOptions} from '@ionic-native/file-transfer';
import {Camera, CameraOptions} from '@ionic-native/camera';
import {ToastProvider} from "../toast/toast";
import {ImagePicker} from "@ionic-native/image-picker";
import {Storage} from '@ionic/storage';
import {Crop} from "@ionic-native/crop";
import {HttpProvider} from "../http/http";
import {URLSearchParams} from '@angular/http';
import {Device} from '@ionic-native/device';

@Injectable()
export class ToolProvider {

    constructor(public http: Http,
                public actionSheetCtrl: ActionSheetController,
                private imagePicker: ImagePicker,
                private transfer: FileTransfer,
                private toastProvider: ToastProvider,
                private storage: Storage,
                private httpProvider: HttpProvider,
                private crop: Crop,
                private device: Device,
                private platform: Platform,
                private loadingCtrl: LoadingController,
                public camera: Camera) {
    }

    choosePic($event): Promise<any> {

        return new Promise((resolve, reject) => {

            let actionSheet = this.actionSheetCtrl.create({
                title: '选择图片',
                buttons: [
                    {
                        text: '从相册选择',
                        role: 'destructive',
                        handler: () => {
                            this.storage.get('user').then((user)=>{
                                var options = {
                                    maximumImagesCount:1,
                                    title:"选择相册"
                                };

                                this.imagePicker.getPictures(options).then((results) => {
                                    if (results && results.length > 0) {
                                        // if(user.is_vip) {
                                        //
                                        //     let promiseChain: Promise<any> = Promise.resolve();
                                        //
                                        //     results.forEach((newImage)=>{
                                        //         promiseChain = this.uploadImage(newImage).then((ret) => {
                                        //             resolve(ret);
                                        //         }).catch((err) => {
                                        //             reject(err);
                                        //         });
                                        //     });
                                        //
                                        //     return  promiseChain;
                                        //
                                        // } else {
                                        //     this.crop.crop(results[0], {quality: 75})
                                        //         .then(
                                        //             newImage => {
                                                        this.uploadFile(results[0],"image").then((ret) => {
                                                            resolve(ret);
                                                        }).catch((err) => {
                                                            reject(err);
                                                        });
                                                //     },
                                                //     (error) => {
                                                //         reject(error);
                                                //         this.toastProvider.show(error, 'error');
                                                //     }
                                                // );
                                        // }
                                    } else {
                                        reject("未选择图片");
                                    }
                                }, (err) => {
                                    this.toastProvider.show(err, 'error');
                                    reject(err);
                                });
                            }).catch((err)=>{

                            });


                        }
                    }, {
                        text: '拍照上传',
                        handler: () => {
                            const options: CameraOptions = {
                                quality: 75,
                                destinationType: this.camera.DestinationType.FILE_URI,
                                encodingType: this.camera.EncodingType.JPEG,
                                mediaType: this.camera.MediaType.PICTURE,
                                allowEdit: true
                            }

                            this.camera.getPicture(options).then((imageData) => {
                                    this.uploadFile(imageData,"image").then((ret) => {
                                        resolve(ret);
                                    }).catch((err) => {
                                        reject(err);
                                    });
                                },
                                (err) => {
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

    uploadFile(fileUrl,type='image'): Promise<any> {

        return new Promise((resolve, reject) => {

            this.storage.get("token").then(token => {
                let options: FileUploadOptions = {
                    fileKey: 'file',
                    fileName: fileUrl.substr(fileUrl.lastIndexOf('/') + 1),
                    headers: {"Authorization": 'Bearer ' + token.access_token, "Accept": 'application/x.drip.v1+json'}
                }

                // if(type == "audio") {
                //     options.mimeType = "audio/mp3";
                // } else if(type == "video") {
                //     options.mimeType = "video/mp4";
                // }

                let loading = this.loadingCtrl.create({
                    content: "上传中,请稍候...",
                    dismissOnPageChange: true,
                    showBackdrop: false,
                    duration: 10000
                });

                loading.present();

                const fileTransfer: FileTransferObject = this.transfer.create();
                const that = this;

                fileTransfer.upload(fileUrl, 'https://drip.growu.me/api/upload/'+type, options)
                    .then((res) => {
                        loading.dismiss();
                        var result = JSON.parse(res.response);
                        resolve(result);
                    }, (err) => {
                        loading.dismiss();
                        reject(err.body.json().message);
                        that.toastProvider.show(err.body.json().message, 'error');
                    });
            }).catch((err) => {
                reject(err);
            });
        });

    }


}

