/**
 * Created by Jason.z on 2017/7/4.
 */

import {Component, ViewChild} from '@angular/core';
import {NavController, Tabs, IonicPage} from 'ionic-angular';
import {Storage} from '@ionic/storage';


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

    constructor(storage: Storage) {
        storage.get("messages").then((data)=>{
            this.messageCount = data.total_count;
        });
    }

}