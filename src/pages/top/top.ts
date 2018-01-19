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
    public ret:any;

    private perPage:number = 20;
    public user;

    constructor(private topProvider: TopProvider,private storage:Storage) {
        this.getTopUsers(1);

        this.storage.get('user').then((data) => {
            if(data) {
                this.user = data;
            }
        });
    }

    getTopUsers(page) {
        this.topProvider.getTopUsers(page,this.perPage).then((res)=>{
            this.ret = res;
            this.users = res.users;
        }).catch((err)=>{
        });
    }
}
