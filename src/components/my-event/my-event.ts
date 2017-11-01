import {Component, Input} from '@angular/core';
import {ActionSheetController, App} from 'ionic-angular';
import {EventProvider} from '../../providers/event/event'
import {MyShareController} from "../my-share/my-share.controller";

@Component({
    selector: 'my-event',
    templateUrl: 'my-event.html',
})
export class MyEventComponent {

    // public events:any = [];
    @Input() _eventSource: any = [];

    constructor(public actionSheetCtrl: ActionSheetController,
                private myShareCtrl: MyShareController,
                private app: App,
                private eventProvider: EventProvider) {

    }

    ionViewDidLoad() {
    }

    @Input()
    set eventSource(value: any) {
        this._eventSource = value;
    }


    doLike(event, $event) {
        console.log($event);
        let index = this._eventSource.indexOf(event);

        if (event.is_like) {
            this.eventProvider.unLike(event.id).then((data) => {
                this._eventSource[index].is_like = false;
                this._eventSource[index].like_count -= 1;
            }).catch((err) => {

            });
        } else {
            this.eventProvider.like(event.id).then((data) => {
                this._eventSource[index].is_like = true;
                this._eventSource[index].like_count += 1;
            }).catch((err) => {

            });
        }
    }

    showMore(event) {
        let actionSheet = this.actionSheetCtrl.create({
            title: '更多',
            buttons: [
                {
                    text: '分享',
                    role: 'destructive',
                    handler: () => {
                        console.log('Destructive clicked');
                        let myShare = this.myShareCtrl.create({
                            data: {
                                 type: 'url',
                                 title: event.owner.nickname + " 的打卡动态",
                                 description: event.content,
                                 image: event.attachs ? event.attachs[0].url : '',
                                 thumb: event.attachs ? event.attachs[0].url : '',
                                 url:"http://drip.growu.me"
                            }
                        })
                        ;
                        myShare.present();
                    }
                }, {
                    text: '举报',
                    handler: () => {
                        console.log('Archive clicked');
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

    goEventDetailPage(id) {
        this.app.getRootNav().push('event-detail', {id: id});
    }

    goUserHomePage(user) {
        this.app.getRootNav().push('user-home', {id: user.id});
    }
}
