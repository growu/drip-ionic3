
import { Component,ViewChild} from '@angular/core';
import { IonicPage, NavController,Tabs } from 'ionic-angular';

@IonicPage({
    'name':'explore'
})
@Component({
    templateUrl: 'explorer.html'
})
export class ExplorerPage {

    constructor(private navCtrl:NavController) {

    }

    goTopPage() {
        this.navCtrl.push('top');
    }

}

