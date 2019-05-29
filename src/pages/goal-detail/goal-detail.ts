import {Component, ViewChild} from '@angular/core';
import {
    ActionSheetController, AlertController, App, Events, IonicPage, NavController, NavParams,
    PopoverController
} from 'ionic-angular';
import {SuperTabs, SuperTabsController} from "ionic2-super-tabs/dist/index";
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

    @ViewChild(SuperTabs) superTabs: SuperTabs;

    page1: any = "goal-detail-info";
    page2: any = "goal-detail-event";
    page3: any = "goal-detail-index";
    page4: any = "goal-detail-calendar";
    page5: any = "goal-detail-chart";

    public selectedTabIndex: number = 2;
    public goal: any = {};
    public weeks:[string] = ['日','一','二','三','四','五','六'];

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                private events: Events,
                private app: App,
                private userProvider: UserProvider,
                private superTabsCtrl: SuperTabsController,
                private toastProvider: ToastProvider,
                private actionSheetCtrl: ActionSheetController,
                private alertCtrl: AlertController,
                private popoverCtrl: PopoverController) {

        this.goal = this.navParams.data.goal;

        if(!this.goal) {
            this.navCtrl.popToRoot();
        }

        events.subscribe('goals:update', () => {
            this.getGoalsInfo();
        });
    }

    getGoalsInfo() {
        console.log(this.navParams);
        var params = this.navParams;

        let id = this.navParams.data.id;
        this.userProvider.getGoalsInfo(id).then((data) => {
            this.goal = data;
        }).catch((err) => {

        });
    }

    ionViewDidLoad() {
        // this.getGoalsInfo();
    }

    // showMore() {
    //     this.isShowMore = !this.isShowMore;
    // }

    // 打开菜单
    openMenu($event) {
        let buttons =  [];

        if(!this.goal.is_archive) {
            buttons.push({
                text: '编辑目标',
                role: 'perssive',
                handler: () => {
                    this.navCtrl.push('goal-create', {id: this.goal.id, goal: this.goal,action:'update'})
                }
            },{
                text: '归档目标',
                role: '',
                handler: () => {

                    let confirm = this.alertCtrl.create({
                        title: '确认归档?',
                        message: '归档后目标将从你的列表中移除，你可以在个人中心-我的归档里查看',
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
                                    this.goal['is_archive'] = 1;
                                    this.userProvider.updateGoals(this.goal.id, this.goal).then(data => {
                                        this.toastProvider.show("归档成功",'success');
                                        this.events.publish('goals:update', {});

                                    }).catch((err) => {

                                    });
                                }
                            }
                        ]
                    });
                    confirm.present();
                }
            });
        }

        buttons.push({
            text: '删除目标',
            role: 'destructive',
            handler: () => {
                this.doDelGoal();
            }
        }, {
            text: '取消',
            role: 'cancel',
            handler: () => {

            }
        })


        let actionSheet = this.actionSheetCtrl.create({
                title: '目标设置',
                buttons: buttons
            });
            actionSheet.present();
    }

    /**
     * 删除目标
     */
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
                            // this.app.getRootNav().setRoot('home');
                            this.navCtrl.popToRoot();
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

    goIndexPage(){
        this.superTabs.slideTo(2);
    }

}
