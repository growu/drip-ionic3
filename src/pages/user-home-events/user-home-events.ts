import {Component, ViewChild} from '@angular/core';
import {App, IonicPage, NavController, NavParams,Content} from 'ionic-angular';
import {UserProvider} from "../../providers/user/user";

@IonicPage({
    name: 'user-home-events',
    segment: 'events'
})
@Component({
    selector: 'page-user-home-events',
    templateUrl: 'user-home-events.html',
})
export class UserHomeEventsPage {
    public events: any = [];
    private perPage: number = 10;
    public isLoading: boolean = false;

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                private app: App,
                private userProvider: UserProvider) {
    }

    ionViewDidLoad() {
    }

    ionViewDidEnter() {
        this.isLoading = true;

        this.getUserEvents().then(data=>{
            this.isLoading = false;
        }).catch(err=>{
            this.isLoading = false;
        });
    }

    getUserEvents() {
        let id = this.navParams.get('id');

        return this.userProvider.getEvents(id, this.perPage, this.events.length).then((data) => {
            if (data) {
                if (this.events.length == 0) {
                    this.events = data;
                } else {
                    this.events = this.events.concat(data);
                }
            }
        });
    }

    /**
     * 加载更多动态
     *
     * @param infiniteScroll
     */
    doInfinite(infiniteScroll) {

        if(this.isLoading) {
            infiniteScroll.complete();
            return;
        }

        this.getUserEvents().then(data=>{
            infiniteScroll.complete();
        });

        setTimeout(() => {
            infiniteScroll.complete();
        }, 10000);
    }

    goCheckinPage() {
        this.app.getRootNav().push('goal-checkin', {'id': this.navParams.data.id});
    }
}
