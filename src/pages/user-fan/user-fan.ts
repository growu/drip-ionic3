import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {UserProvider} from '../../providers/user/user';

@IonicPage({
    name: 'user-fan',
    segment: '/user/:id/fan'
})
@Component({
    selector: 'page-user-fan',
    templateUrl: 'user-fan.html',
})
export class UserFanPage {
    public user: any;
    public users: any = [];
    private perPage: number = 20;

    constructor(public navCtrl: NavController,
                public userProvider: UserProvider,
                public navParams: NavParams) {
    }

    ionViewDidLoad() {
        this.getUserFans(1);
        this.user = this.navParams.get("user");
    }

    getUserFans(page) {
        var id = this.navParams.get("id");

        this.userProvider.getUserFans(id, page, this.perPage).then((data) => {

            if (page == 1) {
                this.users = data;
            } else {
                this.users = this.users.concat(data);
            }

        });
    }

    doRefresh(refresher) {

        this.getUserFans(1);

        setTimeout(() => {
            refresher.complete();
        }, 2000);
    }

    doInfinite(infiniteScroll) {

        var num = this.users.length;

        if (num > 0 && num % 20 == 0) {
            var page = Math.floor(this.users.length / 20) + 1;
            this.getUserFans(page);
        }

        setTimeout(() => {
            infiniteScroll.complete();
        }, 2000);
    }

    doFollow(user, $event) {
        $event.stopPropagation();

        this.userProvider.follow(user.id).then((data) => {
            let index = this.users.indexOf(user);
            this.users[index].user.is_follow = true;
        });
    }

    doUnFollow(user, $event) {
        $event.stopPropagation();

        this.userProvider.unFollow(user.id).then((data) => {
            let index = this.users.indexOf(user);
            this.users[index].user.is_follow = false;
        });
    }

    goUserHomePage(user) {
        this.navCtrl.push('user-home', {'id': user.id});
    }

}
