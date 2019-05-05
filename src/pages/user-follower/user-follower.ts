import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {UserProvider} from '../../providers/user/user';

@IonicPage({
    name: 'user-follower',
    segment: '/user/:id/follower'
})
@Component({
    selector: 'page-user-follower',
    templateUrl: 'user-follower.html',
})
export class UserFollowerPage {
    public user: any;
    public users: any = [];
    private perPage: number = 10;
    public isLoading:boolean = false;

    constructor(public navCtrl: NavController,
                public userProvider: UserProvider,
                public navParams: NavParams) {
    }

    ionViewDidLoad() {
        this.user = this.navParams.get("user");

        if(!this.user) return;

        this.isLoading = true;
        this.getUserFollowers().then(data=>{
            this.isLoading = false;
        }).catch(err=>{
            this.isLoading = false;
        });
    }

    getUserFollowers(isRefresh:boolean=false) {
        return this.userProvider.getUsersFollowers(this.user.id, this.perPage ,this.users.length).then((data) => {
            if (isRefresh || this.users.lengt == 0) {
                this.users = data;
            } else {
                this.users = this.users.concat(data);
            }

        });
    }

    doRefresh(refresher) {
        this.getUserFollowers(true).then(data=>{
            refresher.complete();
        });

        setTimeout(() => {
            refresher.complete();
        }, 2000);
    }

    doInfinite(infiniteScroll) {
        this.getUserFollowers(false).then(data=>{
            infiniteScroll.complete();
        });

        setTimeout(() => {
            infiniteScroll.complete();
        }, 2000);
    }


    goUserHomePage(user) {
        this.navCtrl.push('user-home', {'id': user.id});
    }

}
