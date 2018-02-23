import {Component} from '@angular/core';
import {AlertController, IonicPage, ModalController, NavController, NavParams} from 'ionic-angular';
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
        items: []
    };
    public min: string = moment().format('YYYY-MM-DD');
    public max: string = '2038-12-31';
    public user: any = {};

    private goalEditForm: FormGroup;

    constructor(public navCtrl: NavController,
                private formBuilder: FormBuilder,
                private toastProvider: ToastProvider,
                private userProvider: UserProvider,
                private alertCtrl: AlertController,
                private goalProvider: GoalProvider,
                private modalCtrl: ModalController,
                public events: Events,
                private storage: Storage,
                public navParams: NavParams) {

        this.goalEditForm = this.formBuilder.group({
            'name': ['', [Validators.required, Validators.maxLength(20)]],
            'desc': ['', [Validators.required, Validators.maxLength(255)]],
            'start_date': [{disabled: true}, []],
            'end_date': ['', []],
            'is_public': [true, []],
            'remind_time': ['', []],
            'items': [[], []],
        });
    }

    ionViewDidLoad() {

        let id = this.navParams.get('id');
        this.userProvider.getGoal(id).then((data) => {
            this.goal = data;
        }).catch((err) => {});

        this.storage.get('user').then((data) => {
            this.user = data;
        });
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

        this.goalEditForm.value.items = this.goal.items;

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


}
