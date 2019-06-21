import {Component} from '@angular/core';
import {App, NavController, NavParams, IonicPage, Events, ModalController, Platform} from "ionic-angular";
import {UserProvider} from "../../providers/user/user";
import {ToolProvider} from "../../providers/tool/tool";
import * as moment from 'moment'
import swal from "sweetalert2";
import {Storage} from '@ionic/storage';
import {ToastProvider} from "../../providers/toast/toast";
import { Media, MediaObject } from '@ionic-native/media';
import { File } from '@ionic-native/file';
import { VideoEditor} from '@ionic-native/video-editor';
import {
    MediaCapture, MediaFile, CaptureError, CaptureImageOptions,
    CaptureVideoOptions,CaptureAudioOptions
} from '@ionic-native/media-capture';
import { StreamingMedia, StreamingVideoOptions,StreamingAudioOptions} from '@ionic-native/streaming-media';

@IonicPage({
    name: "goal-checkin",
    segment: "goal/:id/checkin",
    defaultHistory: ['home']
})
@Component({
    selector: 'page-goal-checkin',
    templateUrl: 'goal-checkin.html',
})
export class GoalCheckinPage {
    public attachs: any = [];
    public goal = {
        items: []
    };
    public user: any = {};
    public day;
    public content;
    public min: string = '';
    public max: string = moment().format('YYYY-MM-DD');

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public app: App,
                private events: Events,
                private  userProvider: UserProvider,
                private toastProvider: ToastProvider,
                private storage: Storage,
                private modalCtrl: ModalController,
                public media: Media,
                private videoEditor: VideoEditor,
                private platform: Platform,
                private mediaCapture: MediaCapture,
                 public file: File,
                private streamingMedia: StreamingMedia,
                private toolProvider: ToolProvider,) {

        if (this.navParams.get('day')) {
            this.day = this.navParams.get('day');
        } else {
            this.day = moment().format('YYYY-MM-DD');
        }
    }

    ionViewDidLoad() {
        let goal_id = this.navParams.get('id');

        this.userProvider.getGoalsInfo(goal_id).then((data) => {
            this.goal = data;
            this.min = data.start_date;
        }).catch((err) => {

        });

        this.storage.get('user').then((data) => {
            this.user = data;
        });
    }

    /**
     * 提交打卡
     * @param $event
     */
    doCheckin($event) {
        $event.preventDefault();

        let params = {
            day: this.day,
            content: this.content,
            items: this.goal.items,
            attachs: this.attachs,
        };

        this.userProvider.checkinGoal(this.goal, params).then(data => {
            if (data) {
                this.events.publish('goals:update', {});

                swal({
                    title: '打卡成功',
                    text: '每一步前进，都会离梦想更近一点儿.',
                    type: 'success',
                    // timer: 4000,
                    showConfirmButton: true,
                    showCancelButton: true,
                    confirmButtonText:'分享打卡',
                    cancelButtonText:'回到主页',
                    confirmButtonClass:'dp-swal-confirm-button',
                    cancelButtonClass:'dp-swal-cancel-button',
                    // width: '80%',
                    padding: 0
                }).then((result) => {
                    if(result.value) {
                        params['total_days'] = data.total_days;
                        // if (this.attachs.length > 0) {
                        //     params['image'] = this.attachs[0];
                        // } else {
                        //     params['image'] = 'https://source.unsplash.com/random/400x300';
                        // }

                        let body = {
                            'goal': this.goal,
                            'checkin': params,
                            'user': this.user,
                            'event':data.event
                        };

                        let modal = this.modalCtrl.create('goal-checkin-succ', {'data': body});

                        modal.onDidDismiss(data => {
                            this.navCtrl.pop();
                        });

                        modal.present();
                    } else if(  result.dismiss === swal.DismissReason.cancel) {
                        console.log("cancel2");
                        this.navCtrl.popToRoot();
                    }

                }, dismiss => {
                    console.log("cancel");
                    this.navCtrl.popToRoot();
                });




            }

        });
    }

    choosePic($event) {
        this.toolProvider.choosePic($event).then((ret) => {
            this.attachs[0] = ret;
        }).catch((err) => {

        });
    }

    doRecord() {


        // swal({
        //     title: '录音中',
        //     html: '<strong>0</strong>/60 s',
        //     timer: 60000,
        //     imageUrl:"assets/img/recording.gif",
        //     imageHeight: 150,
        //     imageWidth: 150,
        //     showConfirmButton: true,
        //     confirmButtonText:"停止录音",
        //     padding: 0,
        //     onOpen: () => {
        //         timerInterval = setInterval(() => {
        //             timeSencond ++;
        //             swal.getContent().querySelector('strong').textContent = timeSencond.toString();
        //         }, 1000)
        //     },
        //     onClose: () => {
        //         clearInterval(timerInterval)
        //     }
        // }).then(() => {
        //     file.stopRecord();
        // }, dismiss => {
        //     file.stopRecord();
        // });
        const that = this;

        let options: CaptureAudioOptions = { limit: 1,duration:30};

        this.mediaCapture.captureAudio(options).then((res:MediaFile[])  => {
            console.log(res);

            that.toolProvider.uploadFile(res[0].fullPath,"audio").then((ret) => {
                console.log(ret);
                that.attachs.push(ret);
            }).catch((err) => {
                that.toastProvider.show("上传失败","error");
            });
          }, 
          (err: CaptureError) => {
            that.toastProvider.show("录音失败","error");
              console.error(err)
            }
          );


    //   this.file.createFile(this.file.tempDirectory, 'my_file.mp3', true).then(() => {
    //      console.log(this.file.tempDirectory);
    //       let filePath = this.file.tempDirectory.replace(/^file:\/\//, '') + 'my_file.mp3';
    //       let file = this.media.create(filePath);
    //       const that = this;
    //       file.startRecord();
    //       file.onSuccess.subscribe(() => {
    //           that.toolProvider.uploadFile(filePath,"audio").then((ret) => {
    //               that.attachs.push(ret);
    //           }).catch((err) => {
    //               that.toastProvider.show("上传失败","error");
    //           });
    //       });
    //       file.onError.subscribe(err => alert('Record fail! Error: ' + err));

    //       let timerInterval;
    //       let timeSencond:number = 0;
    //   });
    }

     doFilm() {
      let options: CaptureVideoOptions = { limit: 1,duration:30};
      const that = this;
      this.mediaCapture.captureVideo(options)
        .then(
          (res: MediaFile[]) => {
              console.log(res);
               that.converToMp4(res[0].fullPath).then((uri)=>{
                   that.toolProvider.uploadFile(uri,"video").then((ret) => {
                       console.log(ret);
                       that.attachs.push(ret);
                   }).catch((err) => {
                       that.toastProvider.show("上传失败","error");
                   });
               });
          },
          (err: CaptureError) => {
            console.error(err);
            that.toastProvider.show("录制失败","error");
          }
        );
    }

    converToMp4(uri) {

        if(this.platform.is('ios')) {

            return this.videoEditor.transcodeVideo({
                fileUri: uri,
                outputFileName: 'output.mp4',
                outputFileType: 1
            })
                .then((fileUri: string) => {
                    console.log('video transcode success', fileUri);
                    return fileUri
                })
                .catch((error: any) => {
                    console.log('video transcode error', error);
                    return null;
                });
        } else {
            return uri;
        }

    }

    removeAttach($event) {
        $event.preventDefault();
        this.attachs = [];
    }

    deleteItem(item, $event) {
        let index = this.goal.items.indexOf(item);
        console.log(index);
        if (index >= 0) {
            this.goal.items.splice(index, 1);
        }
    }

    playAudio(audio) {

        // const file: MediaObject = this.media.create('http://file.growu.me/5bfad2cef41c6.mp3');

        // console.log(file);

        // file.onStatusUpdate.subscribe(status => console.log(status));
        //
        // file.onSuccess.subscribe(() => console.log('Action is successful'));
        //
        // file.onError.subscribe(error => console.log('Error!', error));
        //
        // // play the file
        // file.play();


        let options: StreamingAudioOptions = {
            initFullscreen:false,
            successCallback: () => { console.log('audio played') },
            errorCallback: (e) => { console.log('Error audio') },
        };

        this.streamingMedia.playAudio(audio.url, options);
    }


    playVideo(video) {
        let options: StreamingVideoOptions = {
            successCallback: () => { console.log('Video played') },
            errorCallback: (e) => { console.log('Error Video') },
            orientation: 'landscape',
            shouldAutoClose: true,
            controls: false
        };

        this.streamingMedia.playVideo(video.url, options);
    }
}
