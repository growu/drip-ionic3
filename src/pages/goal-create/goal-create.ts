import {Component, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController, DateTime} from 'ionic-angular';
import {Validators, FormBuilder, FormGroup} from '@angular/forms';
import {GoalProvider} from "./../../providers/goal/goal";
import {ToastProvider} from "./../../providers/toast/toast";
import {LoadingProvider} from "./../../providers/loading/loading";
import * as moment from 'moment'
import swal from 'sweetalert2'

@IonicPage({
    name: 'goal-create',
    segment: 'goal/create'
})
@Component({
    selector: 'page-goal-create',
    templateUrl: 'goal-create.html',
})
export class GoalCreatePage {
    @ViewChild('endDate') endDate: DateTime;

    public min: string = moment().format('YYYY-MM-DD');
    public max: string = '2038-12-31';

    public goal = {
        start_date: this.min,
        end_date: null,
        remind_time: null,
        weeks: [],
    }

    private goalCreateForm: FormGroup;

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public toastCtrl: ToastController,
                private formBuilder: FormBuilder,
                private toastProvider: ToastProvider,
                private loadingProvider: LoadingProvider,
                private goalProvider: GoalProvider) {

        this.goalCreateForm = this.formBuilder.group({
            'name': ['', [Validators.required, Validators.maxLength(20)]],
            'desc': ['', [Validators.required, Validators.maxLength(255)]],
            'start_date': ["", []],
            'end_date': ['', []],
            'is_public': [true, []],
            'remind_time': ['', []]
        });
    }

    ionViewDidLoad() {
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

    onClearRemindTime() {
        this.goal.remind_time = null;
    }

    // onWeekChanged($event) {
    //     this.goal.weeks = $event;
    // }

    doCreateGoal() {

        if (!this.goalCreateForm.valid) {
            if (!this.goalCreateForm.controls.name.valid) {
                this.toastProvider.show("请输入目标名称", "error");
                return;
            }
        }

        this.goalProvider.createGoal(this.goalCreateForm.value).then(data => {
            if (data) {

                swal({
                    title: '创建成功',
                    text: '开始第一次打卡吧',
                    type: 'success',
                    timer: 2000,
                    showConfirmButton: false,
                    width: '50%'
                }).then(() => {
                }, dismiss => {
                    this.navCtrl.push('goal-detail', {id: data.id});
                });
            }
        });
    }

}
