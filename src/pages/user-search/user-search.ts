import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {UserProvider} from "../../providers/user/user";

@IonicPage({
    name: 'user-search',
    segment: 'user/search'
})
@Component({
    selector: 'page-user-search',
    templateUrl: 'user-search.html',
})
export class UserSearchPage {

    public users = [];
    public searchText: string = null;

    constructor(public navCtrl: NavController,
                private userProvider: UserProvider,
                public navParams: NavParams) {
    }

    /**
     * 搜索用户
     *
     * @param word
     */
    getUsers(word) {
        console.log(this.searchText);
        this.userProvider.searchUser(this.searchText).then((data) => {
            this.users = data;
        }).catch((err) => {

        });
    }

}
