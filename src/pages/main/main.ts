/**
 * Created by Jason.z on 2017/7/4.
 */

import {Component, ViewChild} from '@angular/core';
import {NavController, Tabs, IonicPage} from 'ionic-angular';
import {Storage} from '@ionic/storage';
import {UserProvider} from "../../providers/user/user";


@IonicPage({
    name: 'main',
})
@Component({
    selector: 'page-main',
    templateUrl: 'main.html'
})
export class MainPage {

    @ViewChild('mainTabs') tabs: Tabs;

    homeRoot: string = 'home';
    explorerRoot: string = 'explore';
    eventRoot: string = 'event';
    myRoot: string = 'my';
    messageCount: number = 0;

    constructor(storage: Storage,userProvider: UserProvider) {
        //storage.get("messages").then((data)=>{
        //     this.messageCount = data.total_count;
        // });

        setInterval(() => {
            userProvider.getNewMessages().then((data)=>{
                this.messageCount = data.total_count;
                storage.set('messages',data);
            }).catch((err)=>{

            })
        }, 60000);
    }

}