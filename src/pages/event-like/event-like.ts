import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {EventProvider} from '../../providers/event/event'
import {UserProvider} from '../../providers/user/user'

@IonicPage({
    name: 'page-event-like',
    segment: 'event/:id/like'
})
@Component({
    selector: 'page-event-like',
    templateUrl: 'event-like.html',
})
export class EventLikePage {
    public likes: any = [];
    private perPage: number = 10;
    public isLoading: boolean;

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public eventProvider: EventProvider,
                public userProvider: UserProvider) {


    }

    ionViewDidLoad() {
        this.isLoading = true;
        this.getEventLikes().then(data=>{
            this.isLoading = false;
        }).catch(err=>{
            this.isLoading = false;
        });
    }

    /**
     * 获取动态点赞
     * @param page
     */
    getEventLikes(isRefresh:boolean=false) {
        let id = this.navParams.get("id")

        if(typeof id == "undefined") {
            return;
        }

        return this.eventProvider.getEventLikes(id, this.perPage,this.likes.length).then((data) => {

            if (isRefresh || this.likes.length == 0) {
                this.likes = data;
            } else {
                this.likes = this.likes.concat(data);
            }

        });
    }

    doRefresh(refresher) {

        this.getEventLikes(true).then(data=>{
            refresher.complete();
        });

        setTimeout(() => {
            refresher.complete();
        }, 10000);
    }

    doInfinite(infiniteScroll) {

        this.getEventLikes(true).then(data=>{
            infiniteScroll.complete();
        });

        setTimeout(() => {
            infiniteScroll.complete();
        }, 10000);
    }

    goUserHomePage(user) {
        this.navCtrl.push('user-home', {'id': user.id});
    }

}
