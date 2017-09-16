/**
 * Created by Jason.z on 2017/7/4.
 */

import { Component,ViewChild} from '@angular/core';
import { NavController,Tabs,IonicPage } from 'ionic-angular';


@IonicPage( {
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

    constructor() {
    }

}