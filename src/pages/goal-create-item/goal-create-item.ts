import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {ToastProvider} from "../../providers/toast/toast";

@IonicPage({
    name: 'goal-create-item'
})
@Component({
    selector: 'page-goal-create-item',
    templateUrl: 'goal-create-item.html',
})
export class GoalCreateItemPage {

    public item = {
        id:null,
        name: '打卡次数',
        unit: '次',
        expect: 1,
    };

    private index = -1;

    public color = 'primary';

    constructor(public navCtrl: NavController,
                private viewCtrl: ViewController,
                private toastProvider: ToastProvider,
                public navParams: NavParams) {

        if (this.navParams.get('item')) {
            this.item = this.navParams.get('item');
        }

        if (this.navParams.get('index') != null) {
            this.index = this.navParams.get('index');
        }

        if (this.navParams.get('color')) {
            this.color = this.navParams.get('color');
        }

    }

    ionViewDidLoad() {
    }

    doSaveGoalItem() {

        if (!this.item.name) {
            this.toastProvider.show("名称不能为空", 'warning');
            return;
        }

        if (!this.item.unit) {
            this.toastProvider.show("单位不能为空", 'warning');
            return;
        }

        if (this.item.expect < 1) {
            this.toastProvider.show("数值需要大于1", 'warning');
            return;
        }

        this.viewCtrl.dismiss({item: this.item, index: this.index});
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }

}
