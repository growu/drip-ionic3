import {Component} from '@angular/core';
import {AlertController, IonicPage, ModalController, NavController, NavParams, ViewController} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {GoalProvider} from "./../../providers/goal/goal";
import {ToastProvider} from "./../../providers/toast/toast";
import * as moment from 'moment'
import swal from 'sweetalert2'
import {UserProvider} from "../../providers/user/user";
import {Events} from 'ionic-angular';
import {Storage} from '@ionic/storage';

@IonicPage({
    name: 'goal-edit',
    segment: 'goal/edit/:id'
})
@Component({
    selector: 'page-goal-edit',
    templateUrl: 'goal-edit.html',
})
export class GoalEditPage {
    public goal: any = {
        name: '',
        desc: '',
        items: [],
        weeks: [],
        date_type: 1,
        time_type: 1,
        start_time: '00:00',
        end_time: '23:59',
        checkin_model: 2,
        max_daily_count: 1,
        is_remind: false
    };
    public weeks: Array<number> = [];
    public min: string = moment().format('YYYY-MM-DD');
    public max: string = moment().add(10, 'years').format('YYYY-MM-DD');
    public user: any = {};
    public settingModel: string = 'basic';

    private goalEditForm: FormGroup;

    constructor(public navCtrl: NavController,
                private formBuilder: FormBuilder,
                private toastProvider: ToastProvider,
                private userProvider: UserProvider,
                private alertCtrl: AlertController,
                private viewCtrl: ViewController,
                private goalProvider: GoalProvider,
                private modalCtrl: ModalController,
                public events: Events,
                private storage: Storage,
                public navParams: NavParams) {

        this.goalEditForm = this.formBuilder.group({
            'name': ['', [Validators.required, Validators.maxLength(20)]],
            'desc': ['', [Validators.required, Validators.maxLength(255)]],
            'date_type': [1, []],
            'start_date': [null, []],
            'end_date': [null, []],
            'checkin_model': [2, []],
            'max_daily_count': [1, []],
            'time_type': [1, []],
            'start_time': ['', []],
            'end_time': ['', []],
            'expect_days': ['', []],
            'is_public': [true, []],
            'is_remind': [false, []],
            'remind_time': ['', []],
            'items': [[], []],
        });
    }

    ionViewWillEnter() {
        if(this.navParams.get("disableBack")) {
            this.viewCtrl.showBackButton(false);
        }
    }

    ionViewDidLoad() {

        let id = this.navParams.get('id');

        this.userProvider.getGoalsInfo(id).then((data) => {
            this.goal = data;
            this.weeks = this.goal.weeks;
        }).catch((err) => {
        });

        this.storage.get('user').then((data) => {
            this.user = data;
        });
    }

    // 获取提醒个数
    getRemindcount() {
        if(this.goal.remind_time) {
            var arr = this.goal.remind_time.split(",");
            console.log(arr);
            return arr.length;
        }
    }

    // 日期修改监听
    onDateChange() {
        if (this.goal.end_date < this.goal.start_date) {
            this.goal.end_date = this.goal.start_date;
        }

        if (this.goal.expect_days == 0 || this.goal.expect_days > this.getDays()) {
            this.goal.expect_days = this.getDays();
        }
    }

    // 日期类型切换监听
    onDateTypeChnage($event) {

        if ($event == 2) {
            this.goal.start_date = this.min;
            this.goal.end_date = moment().add(20, 'days').format('YYYY-MM-DD');
            this.goal.expect_days = 21;
        }
    }

    // 时间类型切换监听
    onTimeTypeChnage($event) {
        if ($event == 2) {
            this.goal.start_time = '00:00';
            this.goal.end_time = '23:59';
        }
    }

    // 获取日期范围天数
    getDays() {
        var a = moment(this.goal.start_date);
        var b = moment(this.goal.end_date);
        return b.diff(a, 'days') + 1;
    }

    // 每日打卡最大次数
    checkDailyCount() {
        if (this.goal.max_daily_count > 10) {
            this.toastProvider.show('每日打卡次数不得超过10次', 'error');
            this.goal.max_daily_count = 10;
            return false;
        }
        if (this.goal.max_daily_count < 1) {
            this.toastProvider.show('每日打卡次数不得低于1次', 'error');
            this.goal.max_daily_count = 1;
            return false;
        }
        return true;
    }

    // 目标天数修改监听
    checkDays() {
        if (this.goal.days < 0) {
            this.toastProvider.show('目标天数须大于0', 'error');
            return false;
        }

        if (this.goal.days > 9999) {
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

    // 目标时间修改监听
    onTimeChange() {
        if (this.goal.end_time < this.goal.start_time) {
            this.goal.end_time = this.goal.start_time;
        }
    }

    // 星期切换监听
    onWeekChanged($event) {
        this.weeks = $event;
    }

    deleteGoalItem(item, $event) {
        $event.preventDefault()
        $event.stopPropagation();

        let index = this.goal.items.indexOf(item);

        if (index != -1) {
            this.goal.items.splice(index, 1);
        }
    }

    editGoalItem(item, $event) {
        $event.preventDefault()
        $event.stopPropagation();
        this.goGoalItemCreatePage(item);
    }

    createGoalItem() {
        this.goGoalItemCreatePage(null);
    }

    doUpdateGoal() {

        if (!this.goalEditForm.valid) {
            if (!this.goalEditForm.controls.name.valid) {
                this.toastProvider.show("请输入目标名称", "error");
                return;
            }
        }

        if (!this.checkDays()) return;
        if (!this.checkDailyCount()) return;

        this.goalEditForm.value.items = this.goal.items;
        this.goalEditForm.value.weeks = this.weeks;
        this.goalEditForm.value.remind_time = this.goal.remind_time;
        this.goalEditForm.value.remind_sound = this.goal.remind_sound;
        this.goalEditForm.value.remind_vibration = this.goal.remind_vibration;

        this.goalProvider.updateGoal(this.goal.id, this.goalEditForm.value).then(data => {
            if (data) {
                this.toastProvider.show("修改成功",'success');
                this.events.publish('goals:update', {});
                this.navCtrl.pop();

                // swal({
                //     title: '修改成功',
                //     text: '',
                //     type: 'success',
                //     timer: 2000,
                //     showConfirmButton: false,
                //     width: '80%'
                // }).then(() => {
                //     this.events.publish('goals:update', {});
                //     this.navCtrl.pop();
                // }, dismiss => {
                //     this.navCtrl.pop();
                // });
            }
        }).catch((err) => {

        });
    }

    // onClearRemindTime() {
    //     this.goal.remind_time = null;
    // }

    goGoalItemCreatePage(item) {
        let index = this.goal.items.indexOf(item);
        console.log(index);

        let modal = this.modalCtrl.create("goal-item-create", {item: item, index: index});
        modal.present();

        modal.onDidDismiss((data) => {
            console.log(data);
            if (data) {
                console.log(data.index);
                if (data.index >= 0) {
                    (this.goal.items)[index] = data.item;
                } else {
                    this.goal.items.push(data.item);
                }
            }
        })
    }

    // 打开提醒设置
    openRemindPage() {
        let modal = this.modalCtrl.create("goal-edit-remind", {goal: this.goal});
        modal.present();

        modal.onDidDismiss((data) => {
            console.log(data);
            if (data) {
                this.goal.remind_time = data.remind_time;
                this.goal.remind_sound = data.remind_sound;
                this.goal.remind_vibration = data.remind_vibration;
            }
        })
    }



}
