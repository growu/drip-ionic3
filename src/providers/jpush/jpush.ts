import {Injectable} from '@angular/core';
import {JPush} from '@jiguang-ionic/jpush';
import {Platform} from "ionic-angular";

declare var cordova: any;

@Injectable()
export class JpushProvider {

    protected channel: string;
    protected registrationID: string;
    protected max_tries = 10;
    protected try_count = 0;
    protected timer;

    constructor(public jpush: JPush, private platform: Platform) {
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
            } else {
                console.log("推送状态：开启");
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
                console.log("当前的JPUSH_CHANNEL：" + result)
                if (result) {
                    if (result.JPUSH_CHANNEL) {
                        this.channel = result.JPUSH_CHANNEL;
                    }
                }
            });
        }
    }

    /**
     * 获取推送ID
     *
     */
    getPushID() {

        if (this.registrationID) {
            return;
        }

        if (this.try_count > this.max_tries) {
            return;
        }

        this.try_count++;

        console.log("获取极光推送ID");

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

        if (this.platform.is('cordova')) {

            let params = {
                sequence: 1,
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
}
