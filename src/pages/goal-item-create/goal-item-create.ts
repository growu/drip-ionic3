import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@IonicPage({
    name: 'goal-item-create'
})
@Component({
    selector: 'page-goal-item-create',
    templateUrl: 'goal-item-create.html',
})
export class GoalItemCreatePage {

    private goaltemCreateForm: FormGroup;

    private item = {
        name: '',
        unit: '',
        expect: '',
        type: 1
    };

    private index = -1;

    constructor(public navCtrl: NavController,
                private formBuilder: FormBuilder,
                private viewCtrl: ViewController,
                public navParams: NavParams) {

        // this.goaltemCreateForm = this.formBuilder.group({
        //     'name': ['', [Validators.required, Validators.maxLength(20)]],
        //     'unit': ['', [Validators.required, Validators.maxLength(255)]],
        //     'type': ['', []]
        // });

        if (this.navParams.data) {
            if(this.navParams.get('item')) {
                this.item = this.navParams.get('item');
            }

            this.index =  this.navParams.get('index');
        }
    }

    ionViewDidLoad() {
    }

    doSaveGoalItem() {
        this.viewCtrl.dismiss({item:this.item,index:this.index});
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }

}
