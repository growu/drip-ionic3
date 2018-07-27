import {Component} from '@angular/core';
import {App, NavController, NavParams, IonicPage, Events, ModalController} from "ionic-angular";
import {FormBuilder, FormGroup} from '@angular/forms';
import {UserProvider} from "../../providers/user/user";
import {ToolProvider} from "../../providers/tool/tool";
import * as moment from 'moment'
import swal from "sweetalert2";
import {Storage} from '@ionic/storage';
import {ToastProvider} from "../../providers/toast/toast";

@IonicPage({
    name: "goal-checkin",
    segment: "goal/:id/checkin",
    defaultHistory: ['home']
})
@Component({
    selector: 'page-goal-checkin',
    templateUrl: 'goal-checkin.html',
})
export class GoalCheckinPage {
    public attachs: any = [];
    public goal = {
        items: []
    };
    public user: any = {};
    public day;
    public content;
    public min: string = '';
    public max: string = moment().format('YYYY-MM-DD');

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public app: App,
                private events: Events,
                private  userProvider: UserProvider,
                private toastProvider: ToastProvider,
                private storage: Storage,
                private modalCtrl: ModalController,
                private toolProvider: ToolProvider,) {

        if (this.navParams.get('day')) {
            this.day = this.navParams.get('day');
        } else {
            this.day = moment().format('YYYY-MM-DD');
        }
    }

    ionViewDidLoad() {
        let goal_id = this.navParams.get('id');
        this.userProvider.getGoal(goal_id).then((data) => {
            this.goal = data;
            this.min = data.start_date;
        }).catch((err) => {

        });

        this.storage.get('user').then((data) => {
            this.user = data;
        });
    }

    doCheckin($event) {
        $event.preventDefault();

        let params = {
            day: this.day,
            content: this.content,
            items: this.goal.items,
            attachs: this.attachs,
        };

        this.userProvider.checkinGoal(this.goal, params).then(data => {
            if (data) {
                this.events.publish('goals:update', {});

                swal({
                    title: '打卡成功',
                    text: '每一步前进，都会离梦想更近一点儿.',
                    type: 'success',
                    // timer: 4000,
                    showConfirmButton: true,
                    confirmButtonText:'分享打卡',
                    // width: '80%',
                    padding: 0
                }).then((result) => {
                    if(result.value) {
                        params['total_days'] = data.total_days;
                        // if (this.attachs.length > 0) {
                        //     params['image'] = this.attachs[0];
                        // } else {
                        //     params['image'] = 'https://source.unsplash.com/random/400x300';
                        // }

                        let body = {
                            'goal': this.goal,
                            'checkin': params,
                            'user': this.user,
                            'event':data.event
                        };

                        let modal = this.modalCtrl.create('goal-checkin-succ', {'data': body});

                        modal.onDidDismiss(data => {
                            this.navCtrl.pop();
                        });

                        modal.present();
                    }

                }, dismiss => {
                    this.navCtrl.push('main');
                });




            }

        });
    }

    choosePic($event) {
        this.toolProvider.choosePic($event).then((ret) => {
            this.attachs[0] = ret;
        }).catch((err) => {

        });
    }

    removeAttach($event) {
        $event.preventDefault();
        this.attachs = [];
    }

    deleteItem(item, $event) {
        let index = this.goal.items.indexOf(item);
        console.log(index);
        if (index >= 0) {
            this.goal.items.splice(index, 1);
        }
    }
}
