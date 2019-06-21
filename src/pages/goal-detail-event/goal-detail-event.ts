import {Component} from '@angular/core';
import {App, NavController, NavParams, IonicPage} from "ionic-angular";
import {UserProvider} from '../../providers/user/user'

@IonicPage({
    name: "goal-detail-event",
    segment: "event"
})

@Component({
    selector: 'page-goal-detail-event',
    templateUrl: 'goal-detail-event.html',
})
export class GoalDetailEventPage {

    events: any = [];
    private perPage: number = 10;
    public isLoading:boolean;

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                private app: App,
                private userProvider: UserProvider) {
    }

    ionViewDidEnter() {
        this.isLoading = true;
        this.getGoalEvents().then(data=>{
            this.isLoading = false;
        }).catch(err=>{
            this.isLoading = false;
        });
    }

    /**
     * 获取目标动态
     * @param {boolean} isRefresh
     * @returns {Promise<Promise<Response>>}
     */
    getGoalEvents(isRefresh=false) {
        let id = this.navParams.data.id;

        let offset:number = 0;

        if(!isRefresh) {
            offset = this.events.length;
        }

        return this.userProvider.getGoalEvents(id, this.perPage, offset).then((data) => {
            if (data) {
                if (offset == 0) {
                    this.events = data;
                } else {
                    this.events = this.events.concat(data);
                }
            }
        });
    }

    /**
     * 下拉刷新
     * @param refresher
     */
    doRefresh(refresher) {
        setTimeout(() => {
            refresher.complete();
        }, 10000);

        this.getGoalEvents(true).then(data=>{
            refresher.complete();
        }).catch(err=>{
            refresher.complete();
        });
    }

    /**
     * 上拉加载
     * @param infiniteScroll
     */
    doInfinite(infiniteScroll) {
        setTimeout(() => {
            infiniteScroll.complete();
        }, 10000);

        this.getGoalEvents(true).then(data=>{
            infiniteScroll.complete();
        }).catch(err=>{
            infiniteScroll.complete();
        });
    }
}
