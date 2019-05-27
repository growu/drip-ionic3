import {Injectable} from '@angular/core';
import {JPush} from '@jiguang-ionic/jpush';
import {AlertController, Platform} from "ionic-angular";
import { OpenNativeSettings } from '@ionic-native/open-native-settings';

declare var cordova: any;

@Injectable()
export class JpushProvider {

    protected channel: string;
    protected registrationID: string;
    protected max_tries = 10;
    protected try_count = 0;
    protected timer;
    protected max_tries2 = 5;
    protected try_count2 = 0;
    protected timer2;
    protected isOpen:boolean = false;

    constructor(public jpush: JPush,
                private alertCtrl:AlertController,
                private openNativeSettings: OpenNativeSettings,
                private platform: Platform) {
    }

    /**
     * 初始化接口
     */
    init() {
        this.jpush.init();
        this.jpush.setDebugMode(true);
        this.jpush.setApplicationIconBadgeNumber(0);

        // 检查是否开启推送
        this.jpush.getUserNotificationSettings().then(result => {
            if (result == 0) {
                console.log("推送状态：关闭");
                this.isOpen = false;

                let confirm = this.alertCtrl.create({
                    title: '开启通知?',
                    message: '为了你的正常使用，水滴打卡建议你打开通知权限。',
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
                                this.openNativeSettings.open("notification_id").then(data=>{
                                   console.log("打开设置界面");
                                   //开启计时器查询 状态

                                    this.timer2 = setInterval(() => {
                                        this.getPushStatus();
                                    }, 1000);

                                }).catch(err=>{
                                    console.log("未打开设置界面");
                                })
                            }
                        }
                    ]
                });

                confirm.present();

            } else {
                console.log("推送状态：开启");
                this.isOpen = true;
            }
        });

        // 获取PUSH ID 开启定时器
        this.timer = setInterval(() => {
            this.getPushID();
        }, 1000);

        if (this.platform.is("ios")) {
            this.channel = 'appstore';
        } else if (this.platform.is('android')) {
            cordova.plugins.AppConfig.fetch(['JPUSH_CHANNEL'], result => {
                console.log("当前的JPUSH_CHANNEL：")
                console.log(result);
                if (result) {
                    if (result.JPUSH_CHANNEL) {
                        this.channel = result.JPUSH_CHANNEL;
                    }
                }
            });
        }
    }

    /**
     * 获取推送状态
     */
    getPushStatus() {
        if(this.isOpen) {
            clearInterval(this.timer2);
            this.timer2 = null;
            this.try_count2 = 0;
            return;
        }

        if(this.try_count2>=this.max_tries2) {
            clearInterval(this.timer2);
            this.timer2 = null;
            this.try_count2 = 0;
            return;
        }

        this.try_count2++;

        console.log("获取推送状态...");

        this.jpush.getUserNotificationSettings().then(result => {
            if (result == 0) {
                console.log("推送状态：关闭");
                this.isOpen = false;
            }  else {
                console.log("推送状态：开启");
                this.isOpen = true;
                if(!this.timer) {
                    this.timer = setInterval(() => {
                        this.getPushID();
                    }, 1000);
                }
            }
        });
    }

    /**
     * 获取推送ID
     *
     */
    getPushID() {

        if (this.registrationID) {
            clearInterval(this.timer);
            this.timer = null;
            this.try_count = 0;
            return;
        }

        if (!this.isOpen) {
            clearInterval(this.timer);
            this.timer = null;
            this.try_count = 0;
            return;
        }

        if (this.try_count > this.max_tries) {
            clearInterval(this.timer);
            this.timer = null;
            this.try_count = 0;
            return;
        }

        this.try_count++;

        console.log("正在获取极光推送ID...");
        this.jpush.getRegistrationID().then((id) => {
            if (id) {
                console.log("获取成功：" + id);
                this.registrationID = id;
                clearInterval(this.timer);
            }
        })
    }

    /**
     * 获取渠道号
     * @returns {string}
     */
    getChannel() {
        return this.channel;
    }

    /**
     * 获取推送ID
     * @returns {string}
     */
    getRegistrationID() {
        return this.registrationID;
    }

    /**
     * 设置别名
     * @param user
     */
    setAlias(user) {
        if (!this.isOpen) {
            return;
        }

        if (this.platform.is('cordova')) {

            let params = {
                sequence: new Date().getTime(),
                alias: 'drip_' + user.id
            };

            console.log("正在设置别名:" + params.alias);

            this.jpush.setAlias(params).then(data => {
                console.log("别名设置成功!");
            }).catch(err => {
                console.error("别名设置失败!");
                console.error(err);
            });
        }
    }

    setTag(tag) {
        if (!this.isOpen) {
            return;
        }

        if (this.platform.is('cordova')) {
            this.jpush.setTags({sequence: new Date().getTime(), tags: [tag]}).then(data => {
                console.log("标签设置成功!");
                this.jpush.getAllTags({sequence: new Date().getTime()}).then(data => {
                    console.log("获取所有标签:");
                    console.log(data.tags);
                }).catch(err => {
                    console.log("获取所有标签错误");
                    console.log(err);
                })
            }).catch(err => {
                console.error("标签设置失败!");
                console.error(err);
            });
        }
    }
}
