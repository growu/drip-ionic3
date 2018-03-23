import {Component, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController, DateTime, Events} from 'ionic-angular';
import {Validators, FormBuilder, FormGroup} from '@angular/forms';
import {GoalProvider} from "./../../providers/goal/goal";
import {ToastProvider} from "./../../providers/toast/toast";
import {Storage} from '@ionic/storage';
import * as moment from 'moment'
import swal from 'sweetalert2'

@IonicPage({
    name: 'goal-create',
    segment: 'goal/create',
    defaultHistory: ['home']
})
@Component({
    selector: 'page-goal-create',
    templateUrl: 'goal-create.html',
})
export class GoalCreatePage {

    public min: string = moment().format('YYYY-MM-DD');
    public max: string = moment().add(10, 'years').format('YYYY-MM-DD');
    public user: any = {};

    public goal = {
        start_date: this.min,
        end_date: null,
        remind_time: null,
        days: 0,
        date_type: 1,
        weeks: [],
    };

    private goalCreateForm: FormGroup;

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                private storage: Storage,
                private formBuilder: FormBuilder,
                private toastProvider: ToastProvider,
                private events: Events,
                private goalProvider: GoalProvider) {

        this.goalCreateForm = this.formBuilder.group({
            'name': ['', [Validators.required, Validators.maxLength(20)]],
            'desc': ['', [Validators.required, Validators.maxLength(255)]],
            'start_date': ['', []],
            'end_date': ['', []],
            'date_type': [1, []],
            'days': [0, []],
            'is_public': [true, []],
        });
    }

    ionViewDidLoad() {
        this.storage.get('user').then((data) => {
            this.user = data;
        });
    }

    // 日期修改监听
    onDateChange() {
        if (this.goal.end_date < this.goal.start_date) {
            this.goal.end_date = this.goal.start_date;
        }

        if (this.goal.days == 0 || this.goal.days > this.getDays()) {
            this.goal.days = this.getDays();
        }
    }

    // 日期类型切换监听
    onDateTypeChnage($event) {
        if ($event == 2) {
            this.goal.end_date = moment().add(20, 'days').format('YYYY-MM-DD');
            this.goal.days = 21;
        }
    }

    // 获取日期范围天数
    getDays() {
        var a = moment(this.goal.start_date);
        var b = moment(this.goal.end_date);
        return b.diff(a, 'days') + 1;
    }

    // 目标天数修改监听
    checkDays() {
        if(this.goal.days<0) {
            this.toastProvider.show('目标天数须大于0', 'error');
            return false;
        }

        if(this.goal.days>9999) {
            this.toastProvider.show('目标天数须小于9999', 'error');
            return false;
        }

        if (this.goal.date_type == 2) {
            if (this.goal.days > this.getDays()) {
                this.toastProvider.show('目标天数大于日期范围', 'error');
                return false;
            }
        }
        return true
    }

    // 创建目标
    doCreateGoal() {

        if (!this.goalCreateForm.valid) {
            if (!this.goalCreateForm.controls.name.valid) {
                this.toastProvider.show("请输入目标名称", "error");
                return;
            }
        }

        if (!this.checkDays()) return;

        this.goalProvider.createGoal(this.goalCreateForm.value).then(data => {
            if (data) {

                this.toastProvider.show("目标创建成功",'success');
                this.events.publish('goals:update', {});
                this.navCtrl.push('goal-detail', {id: data.id});

                // swal({
                //     title: '创建成功',
                //     text: '开始打卡吧!',
                //     type: 'success',
                //     timer: 2000,
                //     showConfirmButton: false,
                //     width: '80%'
                // }).then(() => {
                //     this.events.publish('goals:update', {});
                //     this.navCtrl.push('goal-detail', {id: data.id});
                // }, dismiss => {
                //     this.navCtrl.push('goal-detail', {id: data.id});
                // });
            }
        }).catch((err) => {

        });
    }

}
