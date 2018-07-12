import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {DomSanitizer} from "@angular/platform-browser";

@IonicPage({
    name: 'goal-create-color'
})
@Component({
    selector: 'page-goal-create-color',
    templateUrl: 'goal-create-color.html',
})
export class GoalCreateColorPage {
    // public colors = [
    //     '#3498db', '#0984e3',
    //     '#a29bfe', '#6c5ce7',
    //     '#e056fd', '#8e44ad',
    //     '#f39c12', '#d35400',
    //     '#27ae60', '#16a085',
    //     '#e74c3c', '#ff7675',
    //     '#e84393', '#d63031',
    //     '#130f40', '#2c3e50'
    // ];

    public colors = [
        {
            "name": "primary",
            "value": "#2196F3"
        },
        {
            "name": "purple",
            "value": "#6c5ce7"
        },
        {
            "name": "pink",
            "value": "#f368e0"
        },
        {
            "name": "yellow",
            "value": "#f39c12"
        },
        {
            "name": "secondary",
            "value": "#1dd1a1"
        },
        {
            "name": "rose",
            "value": "#e66767"
        },
        {
            "name": "danger",
            "value": "#F44336"
        },
        {
            "name": "dark",
            "value": "#2d3436"
        }
    ];

    public selectColor: string = 'primary';

    constructor(public navCtrl: NavController,
                private sanitizer: DomSanitizer,
                private viewCtrl: ViewController,
                public navParams: NavParams) {

        if(this.navParams.get('color')) {
            this.selectColor = this.navParams.get('color');
        }
    }

    ionViewDidLoad() {
    }

    cancel() {
        this.viewCtrl.dismiss();
    }

    onSelect(color) {
        this.selectColor = color;

        setTimeout(() => {
            let data = {
                color: color.name
            };

            this.viewCtrl.dismiss(data);
        }, 200);


    }

}
