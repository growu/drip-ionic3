/**
 * Created by Jason.z on 2017/7/4.
 */

import { Component,ViewChild} from '@angular/core';
import { NavController,Tabs,IonicPage } from 'ionic-angular';


@IonicPage(
    name:"main",
)
@Component({
    selector: 'page-tabs',
    templateUrl: 'tabs.html'
})
export class TabsPage {

    @ViewChild('mainTabs') tabs: Tabs;

    tabHomeRoot: string = 'home';
    tabExplorerRoot: string = 'explore';
    tabEventRoot: string = 'event';
    tabMyRoot: string = 'my';

    constructor() {
    }

}