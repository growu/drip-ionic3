import {Component, Input} from '@angular/core';
import {ActionSheetController, App} from 'ionic-angular';
import {EventProvider} from '../../providers/event/event'

@Component({
    selector: 'my-event',
    templateUrl: 'my-event.html',
})
export class MyEventComponent {

    // public events:any = [];
    @Input() _eventSource: any = [];

    constructor(public actionSheetCtrl: ActionSheetController,
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
            }).catch((err)=>{

            });
        } else {
            this.eventProvider.like(event.id).then((data) => {
                this._eventSource[index].is_like = true;
                this._eventSource[index].like_count += 1;
            }).catch((err)=>{

            });
        }
    }

    showMore() {
        let actionSheet = this.actionSheetCtrl.create({
            title: '更多',
            buttons: [
                {
                    text: '分享',
                    role: 'destructive',
                    handler: () => {
                        console.log('Destructive clicked');
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

    goUserHomePage(id) {
        this.app.getRootNav().push('user-home', {id: id});
    }
}
