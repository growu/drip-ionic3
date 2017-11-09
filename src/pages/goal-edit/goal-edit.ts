import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {GoalProvider} from "./../../providers/goal/goal";
import {ToastProvider} from "./../../providers/toast/toast";
import {LoadingProvider} from "./../../providers/loading/loading";
import * as moment from 'moment'
import swal from 'sweetalert2'

@IonicPage({
    name: 'goal-edit',
    segment: 'goal/edit/:id'
})
@Component({
    selector: 'page-goal-edit',
    templateUrl: 'goal-edit.html',
})
export class GoalEditPage {
    public goal: any;
    public min: string = moment().format('YYYY-MM-DD');
    public max: string = '2038-12-31';


    private goalEditForm: FormGroup;


    constructor(public navCtrl: NavController,
                private formBuilder: FormBuilder,
                private toastProvider: ToastProvider,
                private goalProvider: GoalProvider,
                public navParams: NavParams) {

        this.goalEditForm = this.formBuilder.group({
            'name': ['', [Validators.required, Validators.maxLength(20)]],
            'desc': ['', [Validators.required, Validators.maxLength(255)]],
            'end_date': ['', []],
            'is_public': [true, []],
            'remind_time': ['', []]
        });

        this.goal = this.navParams.get('goal');
    }

    ionViewDidLoad() {
    }

    doUpdateGoal() {

        if (!this.goalEditForm.valid) {
            if (!this.goalEditForm.controls.name.valid) {
                this.toastProvider.show("请输入目标名称", "error");
                return;
            }
        }

        this.goalProvider.updateGoal(this.goal.id, this.goalEditForm.value).then(data => {
            if (data) {
                swal({
                    title: '修改成功',
                    text: '',
                    type: 'success',
                    timer: 2000,
                    showConfirmButton: false,
                    width: '80%'
                }).then(() => {
                }, dismiss => {
                    this.navCtrl.pop();
                });
            }
        }).catch((err) => {

        });
    }

    onClearStartDate() {
        this.goal.start_date = this.min;
    }

    onClearEndDate() {
        this.goal.end_date = null;
    }

    onChangeDate() {
        if (this.goal.end_date) {
            if (this.goal.end_date < this.goal.start_date) {
                this.goal.end_date = this.goal.start_date;
            }
        }
    }

}
