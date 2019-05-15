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
    public users:any = {
        'checkin':[],
        'coin':[],
    };
    public my:any;
    private perPage:number = 20;
    public user:any;
    public mode:string = 'checkin';
    public isLoading:boolean  = false;

    constructor(private topProvider: TopProvider,
                private navCtrl: NavController,
                private storage:Storage) {

    }

    ionViewDidEnter() {
        this.storage.get('user').then((data) => {
            if(data) {
                this.user = data;
            }
        });

        this.isLoading = true;

        this.getTopUsers().then(data=>{
            this.isLoading = false;
        }).catch(err=>{
           this.isLoading = false;
        });
    }

    /**
     * 获取排行榜用户
     *
     * @returns {Promise<Promise<Response>>}
     */
    getTopUsers() {
        let offset:number = this.users[this.mode].length;
        return this.topProvider.getTopUsers(this.mode,this.perPage,offset).then((res)=>{
            this.my = res.my;
            if(offset == 0) {
                this.users[this.mode] = res.users;
            } else {
                this.users[this.mode] = this.users[this.mode].concat(res.users);
            }
        })
    }

    /**
     * 切换页面
     *
     */
    changePage() {
        // 获取关注动态
        if(this.mode == 'coin') {
            if(this.users.coin.length == 0) {
                this.isLoading = true;
                this.getTopUsers().then(data=>{
                    this.isLoading = false;
                }).catch(err=>{
                    this.isLoading = false;
                });
            }
        }
    }


    goUserHomePage(user){
        this.navCtrl.push('user-home',{id:user.id});
    }

    /**
     * 加载动态
     * @param infiniteScroll
     */
    doInfinite(infiniteScroll) {

        if(this.isLoading) {
            infiniteScroll.complete();
            return;
        };

        setTimeout(() => {
            infiniteScroll.complete();
        }, 10000);

        this.getTopUsers().then(data=>{
            infiniteScroll.complete();
        }).catch(err=>{
            infiniteScroll.complete();
        });
    }
}
