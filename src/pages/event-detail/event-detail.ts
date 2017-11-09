import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {EventProvider} from '../../providers/event/event'
import {MyShareController} from '../../components/my-share/my-share.controller'

@IonicPage({
    name: 'event-detail',
    segment: 'event/:id/detail'
})
@Component({
    selector: 'page-event-detail',
    templateUrl: 'event-detail.html',
})
export class EventDetailPage {
    private event: any;

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public eventProvider: EventProvider,
                private myShareCtrl: MyShareController) {
    }

    ionViewDidLoad() {
        this.getEventDetail();
    }

    getEventDetail() {
        var id = this.navParams.get("id");
        this.eventProvider.getEventDetail(id).then((data) => {
            this.event = data;
        });
    }

    goEventLikePage() {
        var id = this.navParams.get("id");
        this.navCtrl.push('page-event-like', {'id': id});
    }

    doShare(){
        let image = null;
        if (this.event.attachs.length > 0) {
            let attach = this.event.attachs[0];
            if (attach.url) {
                image = attach.url;
            }
        }

        let myShare = this.myShareCtrl.create({
                data: {
                    type: 'url',
                    title: this.event.user.nickname + " 的打卡动态",
                    description: this.event.content,
                    image: image,
                    thumb: image,
                    url: "http://drip.growu.me",
                },
                extra:this.event
            })
        ;
        myShare.present();
    }

    goUserHomePage(user) {
        this.navCtrl.push('user-home', {'id': user.id});
    }

}
