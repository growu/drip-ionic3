import {Component} from '@angular/core';
import {
    ActionSheetController, AlertController, Events, IonicPage, NavController, NavParams,
    PopoverController
} from 'ionic-angular';
import {SuperTabsController} from "ionic2-super-tabs/dist/index";
import {UserProvider} from '../../providers/user/user'
import {ToastProvider} from "../../providers/toast/toast";

@IonicPage({
    name: "goal-detail",
    segment: 'goal/:id/detail'
})
@Component({
    selector: 'page-goal-detail',
    templateUrl: 'goal-detail.html',
})
export class GoalDetailPage {

    page1: any = "goal-detail-summary";
    page2: any = "goal-detail-event";
    page3: any = "goal-detail-chart";
    selectedTabIndex: number = 0;
    public isShowMore: boolean = false;
    goal: any = {};
    public weeks:[string] = ['日','一','二','三','四','五','六'];

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                private events: Events,
                private userProvider: UserProvider,
                private superTabsCtrl: SuperTabsController,
                private toastProvider: ToastProvider,
                private actionSheetCtrl: ActionSheetController,
                private alertCtrl: AlertController,
                private popoverCtrl: PopoverController) {

        events.subscribe('goals:update', () => {
            // user and time are the same arguments passed in `events.publish(user, time)`
            this.getGoal();
        });
    }

    getGoal() {
        console.log(this.navParams);
        var params = this.navParams;

        let id = this.navParams.data.id;
        this.userProvider.getGoal(id).then((data) => {
            this.goal = data;
        }).catch((err) => {

        });
    }

    ionViewDidLoad() {
        this.getGoal();
        console.log(this.goal.type);
    }

    showMore() {
        this.isShowMore = !this.isShowMore;
    }

    // 打开菜单
    openMenu($event) {

            let actionSheet = this.actionSheetCtrl.create({
                title: '目标设置',
                buttons: [
                    {
                        text: '编辑目标',
                        handler: () => {
                            this.navCtrl.push('goal-edit', {id: this.goal.id, goal: this.goal})
                        }
                    },
                    {
                        text: '删除目标',
                        role: 'destructive',
                        handler: () => {
                            this.doDelGoal();
                        }
                    },{
                        text: '取消',
                        role: 'cancel',
                        handler: () => {

                        }
                    }
                ]
            });
            actionSheet.present();
    }

    // 删除目标
    doDelGoal() {

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

    goEditPage() {
        this.navCtrl.push('goal-edit', {id: this.goal.id, goal: this.goal})
    }

    // 进入目标管理页面
    goGoalManagePage() {
        this.navCtrl.push('goal-manage', {id: this.goal.id, goal: this.goal})
    }

}
