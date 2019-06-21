import {Component, Input} from '@angular/core';
import {NavController} from "ionic-angular";

@Component({
    selector: 'dp-inter-link',
    templateUrl: 'dp-inter-link.html'
})
export class DpInterLinkComponent {

    @Input() page = '';
    @Input() params;
    @Input() content;

    constructor(private navCtrl: NavController) {
    }

    goState() {
        this.navCtrl.push(this.page, this.params)
    }

}
