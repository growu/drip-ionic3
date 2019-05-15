import {Component, ViewChild,NgZone} from '@angular/core';
import {
    IonicPage, NavController, NavParams, ToastController, DateTime, Events, ModalController,
    AlertController
} from 'ionic-angular';
import {Validators, FormBuilder, FormGroup} from '@angular/forms';
import {GoalProvider} from "./../../providers/goal/goal";
import {ToastProvider} from "./../../providers/toast/toast";
import {Storage} from '@ionic/storage';
import * as moment from 'moment'
import swal from 'sweetalert2'
import {UserProvider} from "../../providers/user/user";

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

    public type = 1;

    public action = 'create';

    public freqText = "每天";

    public goal = {
        name: null,
        date_type: 1,
        start_date: null,
        end_date: null,
        time_type: 1,
        start_time: null,
        end_time: null,
        remind_time: null,
        remind_sound: null,
        remind_vibration: false,
        expect_days: 0,
        weeks: [],
        is_public: true,
        items: [
            {
                id: null,
                name: '打卡次数',
                expect: 1,
                unit: '次'
            }
        ],
        icon: 'shuidi',
        color: 'primary'
    };
    private goalId;

    // private goalCreateForm: FormGroup;

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                private storage: Storage,
                private alertCtrl: AlertController,
                private userProvider: UserProvider,
                // private formBuilder: FormBuilder,
                private toastProvider: ToastProvider,
                private modalCtrl: ModalController,
                private events: Events,
                private goalProvider: GoalProvider) {

        // this.goalCreateForm = this.formBuilder.group({
        //     'name': ['', [Validators.required, Validators.maxLength(20)]],
        //     'desc': ['', [Validators.required, Validators.maxLength(255)]],
        //     'start_date': ['', []],
        //     'end_date': ['', []],
        //     'date_type': [1, []],
        //     'days': [0, []],
        //     'is_public': [true, []],
        // });

        this.type = this.navParams.get('type');

        if (this.navParams.get('action')) {
            this.action = this.navParams.get('action');
        }

        if (this.navParams.get('goal')) {
            this.goal = this.navParams.get('goal');
            console.log(this.goal);
        }

        if (this.navParams.get('id')) {
            this.goalId = this.navParams.get('id');
        }
    }

    ionViewDidLoad() {
        this.storage.get('user').then((data) => {
            this.user = data;
        });

        this.getFreqText();
    }

    getFreqText() {
        if (this.goal.weeks) {

            if (this.goal.weeks.length < 7 && this.goal.weeks.length > 0) {
                let str = '';
                let weekTextArr = ['日', '一', '二', '三', '四', '五', '六'];

                this.goal.weeks.forEach((v) => {
                    str += '周' + weekTextArr[v] + ',';
                });

                if (str.charAt(str.length - 1) == ',') {
                    str = str.substr(0, str.length - 1);
                }

                this.freqText = str;
            }
        }
    }

    // 创建目标
    save() {
        if (!this.goal.name) {
            this.toastProvider.show("请输入目标名称", "error");
            return;
        }

        if (this.goal.name.length > 50) {
            this.toastProvider.show("目标长度不能大于50个字符", "error");
            return;
        }

        if (this.action == 'create') {
            this.goalProvider.createGoal(this.goal).then(data => {
                if (data) {
                    this.toastProvider.show("创建成功", 'success');
                    this.events.publish('goals:update', {});
                    this.navCtrl.setRoot('home', {id: data.id});
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
        } else {
            this.goalProvider.updateGoal(this.goalId, this.goal).then(data => {
                if (data) {
                    this.toastProvider.show("修改成功", 'success');
                    this.events.publish('goals:update', {});
                    this.navCtrl.pop();

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

    deleteGoal() {
        let confirm = this.alertCtrl.create({
            title: '确认删除?',
            message: '此项操作将会清空该目标下的所有数据，请谨慎操作！',
            buttons: [
                {
                    text: '取消',
                    handler: () => {
                    }
                },
                {
                    text: '确认',
                    cssClass: 'my-alert-danger',
                    handler: () => {
                        this.userProvider.deleteGoal(this.goalId).then((data) => {
                            this.toastProvider.show("删除成功", 'success');
                            this.events.publish('goals:update', {});
                            this.navCtrl.push('home');
                        }).catch((err) => {
                        });
                    }
                }
            ]
        });
        confirm.present();
    }

    goIconPage() {
        let modal = this.modalCtrl.create('goal-create-icon', {color: this.goal.color});

        modal.onDidDismiss(data => {
            console.log(data);
            if (data) {
                this.goal.icon = data.icon;
            }
        });

        modal.present();
    }

    goColorPage() {
        let modal = this.modalCtrl.create('goal-create-color', {color: this.goal.color});

        modal.onDidDismiss(data => {
            console.log(data);

            if (data) {
                this.goal.color = data.color;
            }
        });

        modal.present();
    }

    goItemPage(item) {

        let index = this.goal.items.indexOf(item);

        console.log(index);

        let modal = this.modalCtrl.create('goal-create-item', {
            'item': item,
            'index': index,
            'color': this.goal.color
        });

        modal.onDidDismiss(data => {
            console.log(data);
            if (data) {
                console.log(data.index);
                if (data.index >= 0) {
                    (this.goal.items)[index] = data.item;
                } else {
                    this.goal.items.push(data.item);
                }
            }
        });

        modal.present();
    }

    goFreqPage() {
        let modal = this.modalCtrl.create('goal-create-freq', {
            'weeks': this.goal.weeks,
            'time_type': this.goal.time_type,
            'start_time': this.goal.time_type,
            'end_time': this.goal.end_time,
            'color': this.goal.color
        });

        modal.onDidDismiss(data => {
            console.log(data);
            if (data) {
                this.goal.weeks = data.weeks;
                this.goal.time_type = data.time_type;
                this.goal.start_time = data.start_time;
                this.goal.end_time = data.end_time;
                this.getFreqText();
            }
        });

        modal.present();
    }

    goRemindPage() {
        let modal = this.modalCtrl.create('goal-create-remind', {
            'remind_time': this.goal.remind_time,
            'remind_sound': this.goal.remind_sound,
            'remind_vibration': this.goal.remind_vibration,
            'color': this.goal.color
        });

        modal.onDidDismiss(data => {
            console.log(data);
            if (data) {
                this.goal.remind_time = data.remind_time;
                this.goal.remind_sound = data.remind_sound;
                this.goal.remind_vibration = data.remind_vibration;
            }
        });

        modal.present();
    }

    goDatePage() {
        let modal = this.modalCtrl.create('goal-create-date', {
            'date_type': this.goal.date_type,
            'start_date': this.goal.start_date,
            'end_date': this.goal.end_date,
            'color': this.goal.color
        });

        modal.onDidDismiss(data => {
            console.log(data);
            if (data) {
                this.goal.date_type = data.date_type;
                this.goal.start_date = data.start_date;
                this.goal.end_date = data.end_date;
                this.goal.expect_days = data.expect_days;
            }
        });

        modal.present();
    }

    deleteItem(item) {
        let index = this.goal.items.indexOf(item);

        if (index != -1) {
            this.goal.items.splice(index, 1);
        }
    }

}
