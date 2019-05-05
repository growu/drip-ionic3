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
import {VersionProvider} from '../version/version';

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
                private versionProvider: VersionProvider,
                private platform: Platform) {

    }

    login(user): Promise<any> {
        return new Promise((resolve, reject) => {
            // this.getDevice().then((device) => {
                console.log(this.device.platform);
                user.device = this.device;
                user.version = this.versionProvider.getVersion();
                // this.appConfigProvider.getChannel().then((channel)=>{
                //     user.channel  = channel;

                    this.httpProvider.httpPostNoAuth("/auth/login", user).then((data) => {
                        resolve(data);
                    }).catch((err) => {
                        reject(err);
                    });
                // });
            // });
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

    getUsersInfo(id) {
        return this.httpProvider.httpGetWithAuth("/users/" + id, null);
    }

    /**
     * 获取用户信息
     * @returns {Promise<any>}
     */
    getUserInfo() {
        return this.httpProvider.httpGetWithAuth("/user/", null);
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

    /**
     * 获取目标信息
     * @param id
     * @returns {Promise<any>}
     */
    getGoalsInfo(id) {
        return this.httpProvider.httpGetWithAuth("/user/goals/" + id, null);
    }

    /**
     *  获取用户目标
     * @param userId
     * @returns {Promise<any>}
     */
    getUsersGoals(userId) {
        return this.httpProvider.httpGetWithAuth("/users/" + userId + "/goals", null);
    }

    /**
     * 获取用户相册
     * @param userId
     * @returns {Promise<any>}
     */
    getUsersPhotos(userId,limit,offset) {
        var params = new URLSearchParams();
        params.set('limit', limit);
        params.set('offset', offset);
        return this.httpProvider.httpGetWithAuth("/users/" + userId + "/photos", params);
    }

    /**
     * 更新目标信息
     * @param id
     * @param param
     * @returns {Promise<any>}
     */
    updateGoals(id, param) {
        let body = JSON.stringify(param);
        return this.httpProvider.httpPatchWithAuth("/user/goal/" + id, body);
    }

    /**
     * 获取目标当日打卡
     * @param id
     * @returns {Promise<any>}
     */
    getGoalsToday(id) {
        let params: URLSearchParams = new URLSearchParams();
        return this.httpProvider.httpGetWithAuth("/user/goals/" + id + "/today", params);
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

    /**
     * 删除目标
     * @param id
     * @returns {Promise<any>}
     */
    deleteGoal(id) {
        return this.httpProvider.httpDeleteWithAuth("/user/goals/" + id).then(value => {
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

    /**
     * 目标打卡
     * @param goal
     * @param params
     * @returns {Promise<never | any>}
     */
    checkinGoal(goal, params) {
        return this.httpProvider.httpPostWithAuth("/user/goals/" + goal.id + "/checkin", params).then(data => {
            return data;
        }).catch(e => {
            console.log(e);
        });
    }

    getEvents(id, page, per_page) {
        let params: URLSearchParams = new URLSearchParams();
        params.set('page', page);
        params.set('per_page', per_page);
        return this.httpProvider.httpGetWithAuth("/users/" + id + "/events", params);
    }

    /**
     * 获取目标动态
     * @param id
     * @param page
     * @param per_page
     * @returns {Promise<any>}
     */
    getGoalEvents(id, page, per_page) {
        let params: URLSearchParams = new URLSearchParams();
        params.set('page', page);
        params.set('per_page', per_page);
        return this.httpProvider.httpGetWithAuth("/user/goals/" + id + "/events", params);
    }

    /**
     * 获取目标图表
     * @param id
     * @param item_id
     * @param mode
     * @param day
     * @returns {Promise<any>}
     */
    getGoalsChart(id, item_id,mode, day) {
        let params: URLSearchParams = new URLSearchParams();
        params.set('item_id', item_id);
        params.set('mode', mode);
        params.set('day', day);
        return this.httpProvider.httpGetWithAuth("/user/goals/" + id + "/chart", params);
    }

    /**
     * 获取目标日历
     * @param start_date
     * @param end_date
     * @returns {Promise<any>}
     */
    getGoalsCalendar(id,start_date, end_date) {
        let params: URLSearchParams = new URLSearchParams();
        params.set('start_date', start_date);
        params.set('end_date', end_date);
        return this.httpProvider.httpGetWithAuth("/user/goals/" + id + "/calendar", params);
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

    getPrivateMessages(page, perPage) {
        var params = new URLSearchParams();
        params.set('page', page);
        params.set('per_page', perPage);
        return this.httpProvider.httpGetWithAuth("/user/messages/private", params);
    }

    getPrivateMessageDetail(user_id,page, perPage) {
        var params = new URLSearchParams();
        params.set('user_id', user_id);
        params.set('page', page);
        params.set('per_page', perPage);
        return this.httpProvider.httpGetWithAuth("/user/messages/private/detail", params);
    }

    sendPrivateMessage(body) {     
        return this.httpProvider.httpPostWithAuth("/user/messages/private", body);
    }

    /**
     * 获取具体消息详情
     * @param id
     * @returns {Promise<Response>}
     */
    getMessageDetail(id) {
        return this.httpProvider.httpGetWithAuth("/user/messages/" + id, null);
    }

    /**
     * 获取通知
     * @param limit
     * @param offset
     * @returns {Promise<Response>}
     */
    getNoticeMessages(limit, offset) {
        var params = new URLSearchParams();
        params.set('limit', limit);
        params.set('offset', offset);
        return this.httpProvider.httpGetWithAuth("/user/messages/notice", params);
    }

    /**
     * 获取点赞
     * @param limit
     * @param offset
     * @returns {Promise<Response>}
     */
    getLikeMessages(limit, offset) {
        var params = new URLSearchParams();
        params.set('limit', limit);
        params.set('offset', offset);
        return this.httpProvider.httpGetWithAuth("/user/messages/like", params);
    }

    /**
     * 获取未读消息
     * @returns {Promise<Response>}
     */
    getNewMessages() {
        return this.httpProvider.httpGetWithAuth("/user/messages/unread", null);
    }

    feedback(body) {
        return this.httpProvider.httpPostWithAuth("/user/feedback", body);
    }

    getAuthUserFollowers(offset, limit) {
        var params = new URLSearchParams();
        params.set('offset', offset);
        params.set('limit', limit);
        return this.httpProvider.httpGetWithAuth("/user/followers", params);
    }

    /**
     * 获取用户粉丝列表
     * @param userId
     * @param limit
     * @param offset
     * @returns {Promise<any>}
     */
    getUsersFollowers(userId, limit, offset) {
        var params = new URLSearchParams();
        params.set('offset', offset);
        params.set('limit', limit);
        return this.httpProvider.httpGetWithAuth("/users/" + userId + "/followers", params);
    }

    getUserFollowings(userId, offset, limit) {
        var params = new URLSearchParams();
        params.set('offset', offset);
        params.set('limit', limit);
        return this.httpProvider.httpGetWithAuth("/users/" + userId + "/followings", params);
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

    share(param) {
        let body = JSON.stringify(param);
        return this.httpProvider.httpPostWithAuth("/user/share", body);
    }

}
