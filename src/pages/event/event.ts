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
    public page: string = 'hot';
    public hotEvents: any = [];
    public followEvents: any = [];
    private perPage: number = 10;
    public isLoading:boolean;

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public eventProvider: EventProvider) {
    }

    ionViewDidLoad() {
        // 获取推荐动态
        this.isLoading = true;
        this.getEvents('hot').then(data=>{
            this.isLoading = false;
        }).catch(err=>{
            this.isLoading = false;
        });
    }

    /**
     * 切换页面事件
     */
    changePage() {
        // 获取关注动态
        if(this.page == 'following') {
            if(this.followEvents.length == 0) {
                this.isLoading = true;
                this.getEvents('following').then(data=>{
                    this.isLoading = false;
                }).catch(err=>{
                    this.isLoading = false;
                });
            }
        }
    }


    /**
     * 获取动态
     * @param {boolean} isRefresh
     * @returns {Promise<Response>}
     */
    getEvents(page:string='',isRefresh:boolean=false) {

        if(!page) {
            page = this.page;
        }

        let offset:number = 0;

        if(!isRefresh) {
            if( this.page == 'hot') {
                offset = this.hotEvents.length;
            } else {
                offset = this.followEvents.length;
            }
        }

       return this.eventProvider.getEvents(page, this.perPage, offset).then((data) => {
            if(data) {
                if(this.page == 'hot') {
                    if(isRefresh || this.hotEvents.length==0) {
                        this.hotEvents = data;
                    } else {
                        this.hotEvents = this.hotEvents.concat(data);
                    }
                } else {
                    if(isRefresh || this.followEvents.length==0) {
                        this.followEvents = data;
                    } else {
                        this.followEvents = this.followEvents.concat(data);
                    }
                }
                // TODO REMOVE LOG
                console.log(this.followEvents);
            }
        });
    }

    /**
     * 进入动态详情页
     * @param event
     */
    goEventDetailPage(event) {
        this.navCtrl.push('event-detail', {'id': event.id});
    }

    /**
     * 刷新动态
     * @param refresher
     */
    doRefresh(refresher) {

        if(this.isLoading) {
            refresher.complete();
            return;
        }

        setTimeout(() => {
            refresher.complete();
        }, 10000);

        this.getEvents(this.page,true).then(data=>{
            refresher.complete();
        }).catch(err=>{
            refresher.complete();
        });

    }

    /**
     * 加载动态
     * @param infiniteScroll
     */
    doInfinite(infiniteScroll) {

        if(this.isLoading) {
            infiniteScroll.complete();
            return;
        }

        setTimeout(() => {
            infiniteScroll.complete();
        }, 10000);

        this.getEvents(this.page).then(data=>{
            infiniteScroll.complete();
        }).catch(err=>{
            infiniteScroll.complete();
        });
    }

}
