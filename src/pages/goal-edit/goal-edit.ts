import {Component} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {GoalProvider} from "./../../providers/goal/goal";
import {ToastProvider} from "./../../providers/toast/toast";
import {LoadingProvider} from "./../../providers/loading/loading";
import * as moment from 'moment'
import swal from 'sweetalert2'
import {UserProvider} from "../../providers/user/user";
import { Events } from 'ionic-angular';

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
                private userProvider: UserProvider,
                private alertCtrl: AlertController,
                private goalProvider: GoalProvider,
                public events: Events,
                public navParams: NavParams) {

        this.goalEditForm = this.formBuilder.group({
            'name': [, [Validators.required, Validators.maxLength(20)]],
            'desc': ['', [Validators.required, Validators.maxLength(255)]],
            'start_date': [{disabled: true}, []],
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
                    this.events.publish('goals:update', {});
                    this.navCtrl.pop();
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

    onClearRemindTime() {
        this.goal.remind_time = null;
    }

    onChangeDate() {
        if (this.goal.end_date) {
            if (this.goal.end_date < this.goal.start_date) {
                this.goal.end_date = this.goal.start_date;
            }
        }
    }

    doDelGoal($event) {

        $event.preventDefault();
        $event.stopPropagation();

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
                        this.userProvider.deleteGoal(this.goal.id).then((data) => {
                            this.toastProvider.show("删除成功", 'success');
                            this.navCtrl.push('home', {});
                        });
                    }
                }
            ]
        });
        confirm.present();
    }

}
