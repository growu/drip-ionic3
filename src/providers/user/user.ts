import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {SettingModel} from '../../models/setting.model'
import {Storage} from '@ionic/storage';
import {Device} from '@ionic-native/device';
import {HttpProvider} from '../http/http';
import {URLSearchParams} from '@angular/http';
import {App, Events, ModalController, Platform} from "ionic-angular";
import {JPush} from '@jiguang-ionic/jpush';
import {ToastProvider} from "../../providers/toast/toast";
import * as moment from 'moment'
import swal from "sweetalert2";
import {AppConfigProvider} from '../appconfig/appconfig';

declare var Wechat;
declare var WeiboSDK;
declare var QQSDK;

@Injectable()
export class UserProvider {

    constructor(public httpProvider: HttpProvider,
                private storage: Storage,
                private device: Device,
                public jpush: JPush,
                public appConfigProvider: AppConfigProvider,
                private app: App,
                private events: Events,
                private modalCtrl: ModalController,
                private toastProvider: ToastProvider,
                private platform: Platform) {

    }

    login(user): Promise<any> {
        return new Promise((resolve, reject) => {
            this.getDevice().then((device) => {
                user.device = device;

                this.appConfigProvider.getChannel().then((channel)=>{
                    user.channel  = channel;

                    this.httpProvider.httpPostNoAuth("/auth/login", user).then((data) => {
                        resolve(data);
                    }).catch((err) => {
                        reject(err);
                    });
                });


            });
        });
    }

    changePassword(data) {
        return this.httpProvider.httpPostWithAuth("/user/password/change", data);
    }

    getDevice(): Promise<any> {
        return new Promise((resolve, reject) => {
            if (this.platform.is('cordova')) {

                let device = {
                    cordova: this.device.cordova,
                    model: this.device.model,
                    platform: this.device.platform,
                    uuid: this.device.uuid,
                    version: this.device.version,
                    manufacturer: this.device.manufacturer,
                    isVirtual: this.device.isVirtual,
                    serial: this.device.serial,
                    push_id: null
                };

                this.jpush.getRegistrationID().then((id) => {
                        console.log("获取极光推送ID:" + id);
                        device.push_id = id;
                        resolve(device);
                    },
                    (err) => {
                        console.log("获取极光推送错误");
                        console.log(err);
                        resolve(device);
                    });
            } else {
                resolve(null);
            }
        });
    }

    doThirdLogin(data, provider): Promise<any> {
        return new Promise((resolve, reject) => {
            this.getDevice().then((device) => {
                data.device = device;
                data.provider = provider;

                this.httpProvider.httpPostNoAuth("/auth/third", data).then((data) => {
                    resolve(data);
                }).catch((err) => {
                    reject(err);
                });
            });
        });
    }

    doWechatLogin(): Promise<any> {

        return new Promise((resolve, reject) => {

            if (this.platform.is('cordova')) {

                var scope = "snsapi_userinfo",
                    state = "_" + (+new Date());

                Wechat.auth(scope, state, response => {
                    this.doThirdLogin(response, 'wechat').then((res) => {
                        resolve(res);
                    }).catch((err) => {
                        reject(err);
                    });
                });
            } else {
                reject("非cordova平台");
            }
        });
    }

    doWechatBind(): Promise<any> {

        return new Promise((resolve, reject) => {

            if (this.platform.is('cordova')) {

                var scope = "snsapi_userinfo",
                    state = "_" + (+new Date());

                Wechat.auth(scope, state, response => {
                    this.bind('wechat', response).then((res) => {
                        resolve(res);
                    }).catch((err) => {
                        reject(err);
                    });
                });
            } else {
                reject("非cordova平台");
            }
        });
    }

    doQQLogin(): Promise<any> {
        return new Promise((resolve, reject) => {
            if (this.platform.is('cordova')) {

                var args = {
                    client: QQSDK.ClientType.QQ
                };

                QQSDK.ssoLogin(result => {
                    this.doThirdLogin(result, 'qq').then((res) => {
                        resolve(res);
                    }).catch((err) => {
                        reject(err);
                    });
                }, err => {
                    reject(err);
                }, args);
            } else {
                reject("非cordova平台");
            }
        });
    }

    doQQBind(): Promise<any> {
        return new Promise((resolve, reject) => {
            if (this.platform.is('cordova')) {

                var args = {
                    client: QQSDK.ClientType.QQ
                };

                QQSDK.ssoLogin(result => {
                    this.bind('qq', result).then((res) => {
                        resolve(res);
                    }).catch((err) => {
                        reject(err);
                    });
                }, err => {
                    reject(err);
                }, args);
            } else {
                reject("非cordova平台");
            }
        });
    }

    doWeiboLogin(): Promise<any> {

        return new Promise((resolve, reject) => {
            if (this.platform.is('cordova')) {
                WeiboSDK.ssoLogin(result => {

                    result.provider = 'weibo';
                    result.device = this.getDevice();

                    this.doThirdLogin(result, 'weibo').then((res) => {
                        resolve(res);
                    }).catch((err) => {
                        reject(err);
                    });
                }, err => {
                    reject(err);
                });
            } else {
                reject("非cordova平台");
            }
        });
    }

    doWeiboBind(): Promise<any> {

        return new Promise((resolve, reject) => {
            if (this.platform.is('cordova')) {
                WeiboSDK.ssoLogin(result => {

                    result.provider = 'weibo';
                    result.device = this.getDevice();

                    this.bind('weibo', result).then((res) => {
                        resolve(res);
                    }).catch((err) => {
                        reject(err);
                    });
                }, err => {
                    reject(err);
                });
            } else {
                reject("非cordova平台");
            }
        });
    }

    checkWechatInstalled(): Promise<any> {
        return new Promise<any>((resolve, reject) => {

            if (this.platform.is('cordova')) {
                Wechat.isInstalled(function (installed) {
                    if (installed) {
                        resolve(true);
                    } else {
                        reject("未安装微信");
                    }
                }, function (reason) {
                    reject(reason);
                });
            } else {
                reject("非cordova平台");
            }
        });
    }

    checkQQInstalled(): Promise<any> {
        return new Promise<any>((resolve, reject) => {

            if (this.platform.is('cordova')) {
                var args = {
                    client: QQSDK.ClientType.QQ
                }
                QQSDK.checkClientInstalled(function () {
                    resolve(true);
                }, function (reason) {
                    reject(reason);
                }, args);
            } else {
                reject("非cordova平台");
            }
        });

    }

    register(user) {
        user.device = this.device;

        return this.httpProvider.httpPostNoAuth("/auth/register", user);
    }

    find(user) {
        user.device = this.device;
        return this.httpProvider.httpPostNoAuth("/auth/find", user);
    }

    getUser(id) {
        return this.httpProvider.httpGetWithAuth("/user/" + id, null);
    }

    getUserInfo() {
        return this.httpProvider.httpGetWithAuth("/user/info", null);
    }

    updateUser(id, body) {
        return this.httpProvider.httpPatchWithAuth("/user/" + id, body);
    }

    searchUser(text) {
        let params: URLSearchParams = new URLSearchParams();
        params.set('text', text);
        return this.httpProvider.httpGetWithAuth("/user/search", params);
    }

    getCode(account, type) {
        let param = {
            account: account,
            type: type
        };

        let body = JSON.stringify(param);

        return this.httpProvider.httpPostNoAuth("/auth/code", body);
    }


    follow(id) {
        return this.httpProvider.httpPutWithAuth("/user/follow/" + id, null).then(value => {
            return value;
        }).catch(e => {
            console.log(e)
        });
    }

    bind(provider, param) {
        let body = JSON.stringify(param);

        return this.httpProvider.httpPostWithAuth("/user/bind/" + provider, body).then(value => {
            return value;
        }).catch(e => {
            console.log(e)
        });
    }

    unFollow(id) {
        return this.httpProvider.httpDeleteWithAuth("/user/follow/" + id).then(value => {
            return value;
        }).catch(e => {
            console.log(e)
        });
    }

    getGoals(data,is_archive = "0") {
        var params = new URLSearchParams();
        params.set('day', data);
        params.set('is_archive', is_archive);
        return this.httpProvider.httpGetWithAuth("/user/goals", params);
    }

    getGoal(id) {
        return this.httpProvider.httpGetWithAuth("/user/goal/" + id, null);
    }

    getUserGoals(userId) {
        return this.httpProvider.httpGetWithAuth("/user/" + userId + "/goals", null);
    }

    getUserPhotos(userId) {
        return this.httpProvider.httpGetWithAuth("/user/" + userId + "/photos", null);
    }

    getGoalDay(id, day) {
        let params: URLSearchParams = new URLSearchParams();
        params.set('day', day);
        return this.httpProvider.httpGetWithAuth("/user/goal/" + id + "/day", params);
    }

    getGoalDays(id, page,per_page) {
        let params: URLSearchParams = new URLSearchParams();
        params.set('page', page);
        params.set('per_page', per_page);
        return this.httpProvider.httpGetWithAuth("/user/goal/" + id + "/days", params);
    }

    getGoalWeek(id) {
        return this.httpProvider.httpGetWithAuth("/user/goal/" + id + "/week", null);
    }

    getGoalCalendar(id) {
        return this.httpProvider.httpGetWithAuth("/user/goal/" + id + "/calendar", null);
    }

    deleteGoal(id) {
        return this.httpProvider.httpDeleteWithAuth("/user/goal/" + id).then(value => {
            return value;
        });
    }

    goCheckinPage(goal, params = {}) {

        console.log(goal);

        if (goal.status == 0) {
            this.toastProvider.show("目标还未开始", "error");
            return;
        }

        if (goal.status == 2) {
            this.toastProvider.show("目标已结束", "error");
            return;
        }

        // if (goal.checkin_model == 1) {
        //
        //     let body = {
        //         day: moment().format('YYYY-MM-DD'),
        //         content: null,
        //         items: [],
        //         attachs: []
        //     }
        //
        //     this.checkinGoal(goal, body).then(data => {
        //         if (data) {
        //             this.events.publish('goals:update', {});
        //
        //             body['total_days'] = data.total_days;
        //
        //             this.storage.get('user').then(data => {
        //                 let params2 = {
        //                     'goal': goal,
        //                     'checkin': body,
        //                     'user': data
        //                 };
        //
        //                 let modal = this.modalCtrl.create('goal-checkin-succ', {'data': body});
        //
        //                 modal.onDidDismiss(data => {
        //                 });
        //
        //                 modal.present();
        //             });
        //
        //
        //             // swal({
        //             //     title: '打卡成功',
        //             //     html: '单次打卡奖励：+' + data.single_add_coin + '水滴币<br>连续打卡奖励：+' + data.series_add_coin + '水滴币',
        //             //     type: 'success',
        //             //     // timer: 2000,
        //             //     showConfirmButton: true,
        //             //     width: '80%',
        //             //     // padding: 0
        //             // }).then(() => {
        //             //     this.events.publish('goals:update', {});
        //             // }, dismiss => {
        //             //     this.events.publish('goals:update', {});
        //             // });
        //         }
        //     }).catch(e => {
        //         console.log(e)
        //     });
        // } else {
            params["id"] = goal.id;
            this.app.getRootNav().push('goal-checkin', params);
        // }
    }

    checkinGoal(goal, params) {
        return this.httpProvider.httpPostWithAuth("/user/goal/" + goal.id + "/checkin", params).then(data => {
            return data;
        }).catch(e => {
            console.log(e);
        });
    }

    getEvents(id, page, per_page) {
        let params: URLSearchParams = new URLSearchParams();
        params.set('page', page);
        params.set('per_page', per_page);
        return this.httpProvider.httpGetWithAuth("/user/" + id + "/events", params);
    }

    getGoalEvents(id, page, per_page) {
        let params: URLSearchParams = new URLSearchParams();
        params.set('page', page);
        params.set('per_page', per_page);
        return this.httpProvider.httpGetWithAuth("/user/goal/" + id + "/events", params);
    }

    getGoalChart(id, item_id,mode, day) {
        let params: URLSearchParams = new URLSearchParams();
        params.set('item_id', item_id);
        params.set('mode', mode);
        params.set('day', day);
        return this.httpProvider.httpGetWithAuth("/user/goal/" + id + "/chart", params);
    }

    getGoalsCalendar(start_date, end_date) {
        let params: URLSearchParams = new URLSearchParams();
        params.set('start_date', start_date);
        params.set('end_date', end_date);
        return this.httpProvider.httpGetWithAuth("/user/goals/calendar", params);
    }

    updateGoal(id, body) {
        return this.httpProvider.httpPatchWithAuth("/user/goal/" + id, body);
    }

    getSetting() {
        return this.storage.get('setting');
    }

    getDefaultSetting(): SettingModel {

        var d = <SettingModel> {
            viewMode: "list",
            calendarMode: "",
            hideExpireGoals: false,
            enableSort: false
        };

        return d;
    }

    updateSetting(data: SettingModel) {
        this.storage.set('setting', data);
    }

    updateLocalUser(user) {
        this.storage.set('user', user);
    }

    getFanMessages(page, perPage) {
        var params = new URLSearchParams();
        params.set('page', page);
        params.set('per_page', perPage);
        return this.httpProvider.httpGetWithAuth("/user/messages/fan", params);
    }

    getCommentMessages(page, perPage) {
        var params = new URLSearchParams();
        params.set('page', page);
        params.set('per_page', perPage);
        return this.httpProvider.httpGetWithAuth("/user/messages/comment", params);
    }

    getMessageDetail(id) {
        return this.httpProvider.httpGetWithAuth("/message/" + id, null);
    }

    getNoticeMessages(page, perPage) {
        var params = new URLSearchParams();
        params.set('page', page);
        params.set('per_page', perPage);
        return this.httpProvider.httpGetWithAuth("/user/messages/notice", params);
    }

    getLikeMessages(page, perPage) {
        var params = new URLSearchParams();
        params.set('page', page);
        params.set('per_page', perPage);
        return this.httpProvider.httpGetWithAuth("/user/messages/like", params);
    }

    getNewMessages() {
        return this.httpProvider.httpGetWithAuth("/user/messages/new", null);
    }

    feedback(body) {
        return this.httpProvider.httpPostWithAuth("/user/feedback", body);
    }

    getUserFollwers(id, page, perPage) {
        var params = new URLSearchParams();
        params.set('page', page);
        params.set('per_page', perPage);
        return this.httpProvider.httpGetWithAuth("/user/" + id + "/followers", params);
    }

    getUserFollowings(id, page, perPage) {
        var params = new URLSearchParams();
        params.set('page', page);
        params.set('per_page', perPage);
        return this.httpProvider.httpGetWithAuth("/user/" + id + "/followings", params);
    }

    getCoinLogs(page, per_page) {
        let params: URLSearchParams = new URLSearchParams();
        params.set('page', page);
        params.set('per_page', per_page);
        return this.httpProvider.httpGetWithAuth("/user/coin/logs", params);
    }

    buyVip(body) {
        return this.httpProvider.httpPostWithAuth("/vip/buy", body).then(value => {
            return value;
        }).catch(e => {
            console.log(e)
        });
    }

    deleteCheckin(id) {
        return this.httpProvider.httpDeleteWithAuth("/user/checkin/"+id).then(value => {
            return value;
        }).catch(e => {
            console.log(e)
        });
    }

    getCheckin(id) {
        return this.httpProvider.httpGetWithAuth("/user/checkin/" + id, null);
    }

    updateCheckin(id, body) {
        return this.httpProvider.httpPatchWithAuth("/user/checkin/" + id, body);
    }

}
