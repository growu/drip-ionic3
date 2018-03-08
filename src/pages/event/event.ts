import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {EventProvider} from '../../providers/event/event'

@IonicPage({
    name: 'event',
    segment: 'hot'
})
@Component({
    selector: 'page-event',
    templateUrl: 'event.html',
})
export class EventPage {
    public mode: string = "hot";
    public events: any = [];
    private perPage: number = 20;

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public eventProvider: EventProvider) {
    }

    ionViewDidLoad() {
        this.getEvents(1);
    }

    changeMode() {
        this.events = [];
        this.getEvents(1);
    }

    getEvents(page) {
        this.eventProvider.getEvents(this.mode, page, this.perPage).then((data) => {
            if (data) {
                if (page == 1) {
                    this.events = data;
                } else {
                    this.events = this.events.concat(data);
                }
            }
        });
    }

    // 进入动态详情页
    goEventDetailPage(event) {
        this.navCtrl.push('event-detail', {'id': event.id});
    }

    doRefresh(refresher) {

        this.getEvents(1);

        setTimeout(() => {
            refresher.complete();
        }, 2000);
    }

    doInfinite(infiniteScroll) {

        var num = this.events.length;

        if (num > 0 && num % 20 == 0) {
            var page = Math.floor(this.events.length / 20) + 1;
            this.getEvents(page);
        }

        setTimeout(() => {
            infiniteScroll.complete();
        }, 2000);
    }

}
