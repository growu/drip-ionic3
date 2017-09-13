/**
 * Created by Jason.z on 2017/7/4.
 */

import { Component,ViewChild} from '@angular/core';
import { NavController,Tabs,IonicPage } from 'ionic-angular';


@IonicPage(
)
@Component({
    selector: 'page-tabs',
    templateUrl: 'tabs.html'
})
export class TabsPage {

    @ViewChild('mainTabs') tabs: Tabs;

    tabHomeRoot: string = 'home';
    tabExplorerRoot: string = 'explore';
    tabTopRoot: string = 'top';
    tabMyRoot: string = 'my';

    constructor() {
    }

}