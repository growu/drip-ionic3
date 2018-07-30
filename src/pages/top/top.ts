import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController,Tabs } from 'ionic-angular';
import {TopProvider} from "../../providers/top/top";
import {Storage} from "@ionic/storage";

@IonicPage({
    name:'top',
    segment:'top'
})
@Component({
    selector: 'page-top',
    templateUrl: 'top.html'
})
export class TopPage {

    public users:any = [];
    public my:any;

    private perPage:number = 20;
    public user;
    public mode:string = 'week';

    constructor(private topProvider: TopProvider,
                private navCtrl: NavController,
                private storage:Storage) {
        this.getTopUsers(1);

        this.storage.get('user').then((data) => {
            if(data) {
                this.user = data;
            }
        });
    }

    getTopUsers(page) {
        this.topProvider.getTopUsers(this.mode,page,this.perPage).then((res)=>{
            this.my = res.my;
            this.users = res.users;
        }).catch((err)=>{
        });
    }

    changeMode() {
        this.getTopUsers(1);
    }

    goUserHomePage(user){
        this.navCtrl.push('user-home',{id:user.id});
    }
}
