/**
 * Created by Jason.z on 2017/7/4.
 */

import { Component,ViewChild} from '@angular/core';
import { NavController,Tabs,IonicPage } from 'ionic-angular';


@IonicPage()
@Component({
    selector: 'page-tabs',
    templateUrl: 'tabs.html'
})
export class TabsPage {

    // @ViewChild('mainTabs') tabs: Tabs;

    tabHomeRoot: string = 'TabHomePage';
    tabExplorerRoot: string = 'TabExplorerPage';
    tabTopRoot: string = 'TabTopPage';
    tabMyRoot: string = 'TabMyPage';

    constructor() {
    }

}