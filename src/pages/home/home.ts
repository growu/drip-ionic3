import {Component, ElementRef, ViewChild} from '@angular/core';
import {
    NavController, Tabs, IonicPage, PopoverController, AlertController, ToastController,
    Content, Scroll, Platform
} from 'ionic-angular';
import {UserProvider} from '../../providers/user/user'
import {ToastProvider} from '../../providers/toast/toast'
import {SettingModel} from '../../models/setting.model'
import * as moment from 'moment'
import {Storage} from '@ionic/storage';
import {DragulaService} from "ng2-dragula";
import * as autoScroll from 'dom-autoscroller';
import { NativeStorage } from '@ionic-native/native-storage';
import { Events } from 'ionic-angular';
@IonicPage({
    name: 'home',
    segment: 'home'
})
@Component({
    templateUrl: 'home.html'
})
export class HomePage {
    public viewTitle: string = "所有目标";
    private currentDay: any = null;
    public setting: SettingModel = {
        viewMode: "list",
        calendarMode: "",
        enableSort:false,
        hideExpireGoals:false
    };
    public remindTime;
    public goals: any = [];
    public user: any = {};

    @ViewChild('scrollContent') scrollContent:ElementRef;
    @ViewChild(Content) content: Content;


    constructor(public navCtrl: NavController,
                private popoverCtrl: PopoverController,
                private userProvider: UserProvider,
                private alertCtrl: AlertController,
                public storage: Storage,
                private platform: Platform,
                private nativeStorage: NativeStorage,
                private elementRef:ElementRef,
                public events: Events,
                private dragulaService: DragulaService,
                private toastProvider: ToastProvider) {

        const bag: any = this.dragulaService.find('bag-one');
        if (bag !== undefined ) this.dragulaService.destroy('bag-one');

        dragulaService.setOptions('bag-one', {
            directions:"horizontal",
            moves: (el, source, handle, sibling) => {
                if(this.setting.enableSort) {
                    return !el.classList.contains('no-drag');
                } else {
                    return false;
                }
            }
        });

        // dragulaService.drag.subscribe((value) => {
        //     console.log(`drag: ${value[0]}`);
        //     this.onDrag(value.slice(1));
        // });
        // dragulaService.drop.subscribe((value) => {
        // console.log(`drop: ${value[0]}`);
        // this.onDrop(value.slice(1));
        // });
        // dragulaService.over.subscribe((value) => {
        // console.log(`over: ${value[0]}`);
        // this.onOver(value.slice(1));
        // });
        // dragulaService.out.subscribe((value) => {
        // console.log(`out: ${value[0]}`);
        // this.onOut(value.slice(1));
        // });

        events.subscribe('goals:update', () => {
            console.log("goals:update");
            if(this.setting.calendarMode) {
                let today = moment().format("YYYY-MM-DD");
                this.currentDay = today;
                this.getGoals(today);
            } else {
                this.getGoals(null);
            }
        });

    }

    // private onDrag(args) {
    //     let [e, el] = args;
    //     // do something
    // }
    //
    // private onDrop(args) {
    //     let [e, el] = args;
    //     // do something
    // }
    //
    // private onOver(args) {
    //     let [e, el, container] = args;
    //     // do something
    // }
    //
    // private onOut(args) {
    //     let [e, el, container] = args;
    //     // do something
    // }

    ionViewDidLoad()
    {

        this.userProvider.getSetting().then((settingData) => {
            if (settingData) {
                this.setting = settingData;
            } else {
                this.setting = this.userProvider.getDefaultSetting();
            }
        });

        this.storage.get('user').then((data) => {
            this.user = data;
        });

        if(this.setting.calendarMode) {
            let today = moment().format("YYYY-MM-DD");
            this.currentDay = today;
            this.getGoals(today);
        } else {
            this.getGoals(null);
        }
    }

    ngAfterViewInit() {
        setTimeout(() => {
            var scroll = autoScroll([
                this.scrollContent.nativeElement
                //this.autoscroll.nativeElement,
                //this.autoscroll2.nativeElement
            ],{
                margin: 20,
                maxSpeed: 5,
                scrollWhenOutside: true,
                autoScroll: function(){
                    //Only scroll when the pointer is down.
                    return this.down;
                    //return true;
                }
            });
        }, 3000);
    }



    saveGoalsOrder() {
        this.setting.enableSort = false;
        this.goals.forEach((item,index)=>{
            if(item.status == 1) {
                if(item.order != index) {
                    let param = {
                        order:index,
                    };

                    let body = JSON.stringify(param);

                    this.userProvider.updateGoal(item.id, body).then((data) => {

                    }).catch((err)=>{});
                }
            }
        });
    }

    getGoals(date) {
        this.userProvider.getGoals(date).then((data) => {
            this.goals = data;
            if(this.platform.is('cordova')) {
                if (!date) {
                    let totalNum = data.length;
                    let toBeNum = 0;
                    let hasDoneNum = 0;

                    data.forEach((item, index) => {
                        if (item.is_checkin) {
                            hasDoneNum++;
                        } else {
                            toBeNum++;
                        }
                    });

                    this.nativeStorage.setItem('todayExtension', {
                        toBeNum: toBeNum,
                        hasDoneNum: hasDoneNum,
                        totalNum: totalNum
                    })
                        .then(
                            () => console.log('Stored item!'),
                            error => console.error('Error storing item', error)
                        );

                }
            }
        });
    }

    onViewTitleChanged(title) {
        this.viewTitle = title;
    }

    onDaySelected(day) {
        if(day) {
            this.currentDay = moment(day).format("YYYY-MM-DD");
            this.getGoals(moment(day).format("YYYY-MM-DD"));
        } else {
            this.getGoals('');
        }

    }

    goGoalAddPage() {
        this.navCtrl.push('goal-create', {});
    }

    goGoalDetailPage(id) {
        this.navCtrl.push('goal-detail', {'id': id, 'homePage': this});
    }

    goGoalCheckinPage(id,$event) {
        $event.stopPropagation();
        this.navCtrl.push('goal-checkin', {'id': id, 'homePage': this});
    }

    deleteGoal(goal) {
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
                        this.userProvider.deleteGoal(goal.id).then((data) => {
                            this.toastProvider.show("删除成功", 'success');
                            var index = this.goals.indexOf(goal);
                            this.goals.splice(index, 1);
                        });
                    }
                }
            ]
        });
        confirm.present();
    }

    setRemindTime(goal, $event) {
        console.log($event);

        let param = {
            remind_time: goal.remind_time,
            is_push: 1
        };

        let body = JSON.stringify(param);

        this.userProvider.updateGoal(goal.id, body).then((data) => {
            if (data) {
                this.toastProvider.show('设置成功', 'success');
                this.getGoals(this.currentDay);
            }
        });
    }

    openMenu($event) {
        let popover = this.popoverCtrl.create('home-menu', {
            setting: this.setting,
            user: this.user,
        }, {
            showBackdrop: true,
            cssClass:'my-popover'
        });

        popover.present({
            ev: $event
        });

        popover.onDidDismiss((settingData) => {
            if (settingData) {
                if (!settingData.calendarMode) {
                    this.viewTitle = "所有目标";
                    this.currentDay = null;
                    this.getGoals('');
                } else {
                    this.getGoals(moment().format("YYYY-MM-DD"));
                }
                this.setting = settingData;
                this.userProvider.updateSetting(this.setting);
            }
        })
    }

    // doRefresh(refresher) {
    //   console.log('Begin async operation', refresher);
    //
    //   setTimeout(() => {
    //     console.log('Async operation has ended');
    //     refresher.complete();
    //   }, 2000);
    // }
    // ngOnDestroy() {
    //     this.dragulaService.destroy('bag-one');
    // }

    ngOnDestroy() {
        this.dragulaService.destroy('bag-one');
    }

}
