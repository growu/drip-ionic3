import {Component, ElementRef, ViewChild} from '@angular/core';
import {
    NavController, Tabs, IonicPage, PopoverController, AlertController, ToastController,
    Content, Scroll, Platform, App
} from 'ionic-angular';
import {UserProvider} from '../../providers/user/user'
import {ToastProvider} from '../../providers/toast/toast'
import {SettingModel} from '../../models/setting.model'
import * as moment from 'moment'
import {Storage} from '@ionic/storage';
import {DragulaService} from "ng2-dragula";
import * as autoScroll from 'dom-autoscroller';
import {NativeStorage} from '@ionic-native/native-storage';
import {Events} from 'ionic-angular';
import swal from "sweetalert2";
import {DomSanitizer} from "@angular/platform-browser";

@IonicPage({
    name: 'home',
    segment: 'home'
})
@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {
    public viewTitle: string = "所有目标";
    private currentDay: any = null;
    public setting: SettingModel = {
        viewMode: "list",
        calendarMode: "",
        enableSort: false,
        hideExpireGoals: false
    };
    public remindTime;
    public goals: any = [];
    public user: any = {};

    @ViewChild('scrollContent') scrollContent: ElementRef;
    @ViewChild(Content) content: Content;


    constructor(public navCtrl: NavController,
                private popoverCtrl: PopoverController,
                private userProvider: UserProvider,
                private alertCtrl: AlertController,
                public storage: Storage,
                private app: App,
                private platform: Platform,
                private nativeStorage: NativeStorage,
                private elementRef: ElementRef,
                private sanitizer: DomSanitizer,
                public events: Events,
                private dragulaService: DragulaService,
                private toastProvider: ToastProvider) {

        const bag: any = this.dragulaService.find('bag-one');
        if (bag !== undefined) this.dragulaService.destroy('bag-one');

        dragulaService.setOptions('bag-one', {
            directions: "horizontal",
            moves: (el, source, handle, sibling) => {
                if (this.setting.enableSort) {
                    return true;
                    // return !el.classList.contains('no-drag');
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
            if (this.setting.calendarMode) {
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

    ionViewDidLoad() {

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

        if (this.setting.calendarMode) {
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
                // this.scrollContent.nativeElement
                //this.autoscroll.nativeElement,
                //this.autoscroll2.nativeElement
            ], {
                margin: 20,
                maxSpeed: 5,
                scrollWhenOutside: true,
                autoScroll: function () {
                    //Only scroll when the pointer is down.
                    return this.down;
                    //return true;
                }
            });
        }, 3000);
    }

    saveGoalsOrder() {
        this.setting.enableSort = false;
        this.goals.forEach((item, index) => {
            if (item.status == 1) {
                if (item.order != index) {
                    let param = {
                        order: index,
                    };

                    let body = JSON.stringify(param);

                    this.userProvider.updateGoal(item.id, body).then((data) => {

                    }).catch((err) => {
                    });
                }
            }
        });
    }

    getGoals(date) {
        this.userProvider.getGoals(date).then((data) => {
            this.goals = data;
            // if (this.platform.is('cordova')) {
            //     if (!date) {
            //         let totalNum = data.length;
            //         let toBeNum = 0;
            //         let hasDoneNum = 0;
            //
            //         data.forEach((item, index) => {
            //             if (item.is_checkin) {
            //                 hasDoneNum++;
            //             } else {
            //                 toBeNum++;
            //             }
            //         });
            //
            //         this.nativeStorage.setItem('todayExtension', {
            //             toBeNum: toBeNum,
            //             hasDoneNum: hasDoneNum,
            //             totalNum: totalNum
            //         })
            //             .then(
            //                 () => console.log('Stored item!'),
            //                 error => console.error('Error storing item', error)
            //             );
            //
            //     }
            // }
        });
    }

    onViewTitleChanged(title) {
        this.viewTitle = title;
    }

    onDaySelected(day) {
        if (day) {
            this.currentDay = moment(day).format("YYYY-MM-DD");
            this.getGoals(moment(day).format("YYYY-MM-DD"));
        } else {
            this.getGoals('');
        }
    }

    goGoalAddPage() {
        // console.log(this.navCtrl);
        // this.navCtrl.push('goal-home', {'id':9,'rootNavCtrl':this.navCtrl});
        // this.navCtrl.push('goal-create', {});

        // var inputOptions = new Promise((resolve) => {
        //     setTimeout(() => {
        //         resolve({
        //             '1': '个人目标',
        //             '2': '小组目标(TEAM用户)'
        //         })
        //     }, 500)
        // })
        //
        // swal({
        //     title: '选择目标类型',
        //     input: 'radio',
        //     confirmButtonText: '确定',
        //     inputOptions: inputOptions,
        //     inputValue:1,
        //     inputValidator: (value) => {
        //         return !value && '请选择目标类型'
        //     }
        // }).then((result) => {
        //     if (result.value) {
        //         this.navCtrl.push('goal-create', {});
        //     }
        // })

        this.navCtrl.push('goal-add', {});

        return;

        // let alert = this.alertCtrl.create();
        // alert.setTitle('请选择目标类型');
        //
        // alert.addInput({
        //     type: 'radio',
        //     label: '个人目标',
        //     value: '1',
        //     checked: true
        // });
        //
        // alert.addInput({
        //     type: 'radio',
        //     label: '小组目标',
        //     value: '2'
        // });
        //
        // alert.addButton('取消');
        // alert.addButton({
        //     text: '确定',
        //     handler: data => {
        //         console.log(data);
        //         this.navCtrl.push('goal-create', {'type':data});
        //     }
        // });
        // alert.present();
    }

    goGoalDetailPage(id) {
        this.navCtrl.push('goal-detail', {'id': id, 'homePage': this,'rootNavCtrl':this.navCtrl});
    }

    // 目标打卡
    doCheckin(goal, $event) {
        $event.stopPropagation();
        this.userProvider.goCheckinPage(goal);
    }

    // 删除目标
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
                        }, () => {
                        }).catch((err) => {
                        });
                    }
                }
            ]
        });
        confirm.present();
    }

    //打开首页菜单
    openMenu($event) {
        let popover = this.popoverCtrl.create('home-menu', {
            setting: this.setting,
            user: this.user,
        }, {
            showBackdrop: true,
            cssClass: 'my-popover'
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

    getColor(color:string) {

        console.log(color);

        return this.sanitizer.bypassSecurityTrustStyle('background-color:' + color);

        // return this.sanitizer.bypassSecurityTrustStyle('--progress-bg-color:' + color);
    }

    goGoalTodayPage(goal) {

        // this.navCtrl.push('goal-today', {id: goal.id, goal: goal});
        this.navCtrl.push('goal-detail', {id: goal.id, goal: goal,'rootNavCtrl':this.navCtrl});
    }

    swipeEvent($event) {
        if($event.direction == Hammer.DIRECTION_DOWN) {
           this.navCtrl.push('welcome');
        }
    }

}
