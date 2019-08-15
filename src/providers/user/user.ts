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
import {VersionProvider} from '../version/version';
import {JpushProvider} from "../jpush/jpush";

declare var Wechat;
declare var WeiboSDK;
declare var QQSDK;

@Injectable()
export class UserProvider {

    protected localUser:any;
    protected token:any;

    constructor(public httpProvider: HttpProvider,
                private storage: Storage,
                private device: Device,
                public jpush: JPush,
                private app: App,
                private events: Events,
                private modalCtrl: ModalController,
                private toastProvider: ToastProvider,
                private versionProvider: VersionProvider,
                private jpushProvider: JpushProvider,
                private platform: Platform) {

    }

    /**
     * 用户登录
     * @param user
     * @returns {Promise<any>}
     */
    login(user): Promise<any> {
        return this.httpProvider.httpPostNoAuth("/auth/login", this.getLoginParams(user)).then((data) => {
            this.loginSuccCallback(data);
        }).catch(err => {
            // TODO 提示错误
        });
    }

    /**
     * 用户注册
     * @param user
     * @returns {Promise<Response>}
     */
    register(user) : Promise<any>{
        return this.httpProvider.httpPostNoAuth("/auth/register", this.getLoginParams(user)).then((data) => {
            this.loginSuccCallback(data);
        }).catch(err => {
            // TODO 提示错误
        });
    }

    changePassword(data) {
        return this.httpProvider.httpPostWithAuth("/user/password/change", data);
    }

    /**
     * 第三方登录
     * @param data
     * @param provider
     * @returns {Promise<any>}
     */
    doThirdLogin(data, provider): Promise<any> {
        data.provider = provider;
        return this.httpProvider.httpPostNoAuth("/auth/third", this.getLoginParams(data)).then((data) => {
            this.loginSuccCallback(data);
        }).catch((err) => {

        });
    }

    /**
     * 封装登录参数
     * @param data
     * @returns {any}
     */
    protected getLoginParams(data) {
        data.device = this.getDevice();
        data.version = this.versionProvider.getVersion();
        data.channel = this.jpushProvider.getChannel();
        data.push_id = this.jpushProvider.getRegistrationID();
        console.log(data);
        return data;
    }

    /**
     * 获取设备信息
     * @returns {{cordova: string; model: string; version: string; uuid: string; isVirtual: boolean; platform: string; manufacturer: string; serial: string}}
     */
    protected getDevice() {
        return {
            cordova:this.device.cordova,
            model:this.device.model,
            version:this.device.version,
            uuid : this.device.uuid,
            isVirtual : this.device.isVirtual,
            platform :  this.device.platform,
            manufacturer : this.device.manufacturer,
            serial : this.device.serial
        }
    }

    /**
     * 登录成功回调
     * @param data
     */
    protected loginSuccCallback(data) {
        if(!data || !data.user || !data.token) return;

        this.storage.set('token', data.token);
        this.setLocalUser(data.user);
        // 设置别名
        this.jpushProvider.setAlias(data.user);
        // 设置渠道标签
        if(this.versionProvider.getAppVersion()) {
            this.jpushProvider.setTag(this.versionProvider.getAppVersion());
        }
        // 设置渠道标签
        if(this.jpushProvider.getChannel()) {
            this.jpushProvider.setTag(this.jpushProvider.getChannel());
        }
        // 跳转至欢迎界面
        this.app.getRootNav().setRoot('main');
    }

    /**
     * 微信登录
     * @returns {Promise<any>}
     */
    doWechatLogin(): Promise<any> {

        return new Promise((resolve, reject) => {

            if (this.platform.is('cordova')) {

                var scope = "snsapi_userinfo",
                    state = "_" + (+new Date());

                return Wechat.auth(scope, state, response => {
                    return this.doThirdLogin(response, 'wechat')
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

    /**
     * QQ登录
     * @returns {Promise<any>}
     */
    doQQLogin(): Promise<any> {
        return new Promise((resolve, reject) => {
            if (this.platform.is('cordova')) {

                var args = {
                    client: QQSDK.ClientType.QQ
                };

                return QQSDK.ssoLogin(result => {
                    return this.doThirdLogin(result, 'qq');
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

    /**
     * 微博登录
     * @returns {Promise<any>}
     */
    doWeiboLogin(): Promise<any> {

        return new Promise((resolve, reject) => {
            if (this.platform.is('cordova')) {
                return WeiboSDK.ssoLogin(result => {
                    return this.doThirdLogin(result, 'weibo')
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

    /**
     * 检查微信是否安装
     * @returns {Promise<any>}
     */
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

    /**
     * 检查QQ是否安装
     * @returns {Promise<any>}
     */
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


    find(user) {
        user.device = this.device;
        return this.httpProvider.httpPostNoAuth("/auth/find", user);
    }

    /**
     * 获取用户信息
     * @returns {Promise<any>}
     */
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

    /**
     * 更新
     * @param body
     * @returns {Promise<Promise<Response>>}
     */
    updateUserInfo(body) {
        return this.httpProvider.httpPatchWithAuth("/user", body);
    }

    /**
     * 搜索用户
     *
     * @param text
     * @returns {Promise<Promise<Response>>}
     */
    searchUser(text) {
        let params: URLSearchParams = new URLSearchParams();
        params.set('text', text);
        return this.httpProvider.httpGetWithAuth("/users/search", params);
    }

    getCode(account, type) {
        let param = {
            account: account,
            type: type
        };

        let body = JSON.stringify(param);

        return this.httpProvider.httpPostNoAuth("/auth/code", body);
    }

    /**
     * 关注用户
     *
     * @param id
     * @returns {Promise<never | Response>}
     */
    follow(id) {
        return this.httpProvider.httpPutWithAuth("/users/"+id+"/follow/" , null);
    }

    /**
     * 取消关注
     *
     * @param id
     * @returns {Promise<Promise<Response>>}
     */
    unFollow(id) {
        return this.httpProvider.httpDeleteWithAuth("/users/" + id+"/follow/");
    }

    /**
     * 绑定
     * @param provider
     * @param param
     * @returns {Promise<never | Response>}
     */
    bind(provider,param) {
        let body = JSON.stringify(param);

        return this.httpProvider.httpPostWithAuth("/user/bind/"+provider, body).then(value => {
            return value;
        }).catch(e => {
            console.log(e)
        });
    }


    getGoals(data, is_archive = "0") {
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
    getUsersPhotos(userId, limit, offset) {
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
        return this.httpProvider.httpPatchWithAuth("/user/goals/" + id, body);
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

    getGoalDays(id, page, per_page) {
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
        return this.httpProvider.httpDeleteWithAuth("/user/goals/" + id);
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

    getEvents(id, limit, offset) {
        let params: URLSearchParams = new URLSearchParams();
        params.set('limit', limit);
        params.set('offset', offset);
        return this.httpProvider.httpGetWithAuth("/users/" + id + "/events", params);
    }

    /**
     * 获取目标动态
     * @param id
     * @param page
     * @param per_page
     * @returns {Promise<any>}
     */
    getGoalEvents(id, limit, offset) {
        let params: URLSearchParams = new URLSearchParams();
        params.set('limit', limit);
        params.set('offset', offset);
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
    getGoalsChart(id, item_id, mode, day) {
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
    getGoalsCalendar(id, start_date, end_date) {
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

    /**
     * 获取粉丝消息
     * @param limit
     * @param offset
     * @returns {Promise<Promise<Response>>}
     */
    getFanMessages(limit, offset) {
        var params = new URLSearchParams();
        params.set('limit', limit);
        params.set('offset', offset);
        return this.httpProvider.httpGetWithAuth("/user/messages/fan", params);
    }

    /**
     * 获取评论消息
     *
     * @param limit
     * @param offset
     * @returns {Promise<Promise<Response>>}
     */
    getCommentMessages(limit, offset) {
        var params = new URLSearchParams();
        params.set('limit', limit);
        params.set('offset', offset);
        return this.httpProvider.httpGetWithAuth("/user/messages/comment", params);
    }

    /**
     * 获取私信消息
     *
     * @param limit
     * @param offset
     * @returns {Promise<Promise<Response>>}
     */
    getPrivateMessages(page, perPage) {
        var params = new URLSearchParams();
        params.set('page', page);
        params.set('per_page', perPage);
        return this.httpProvider.httpGetWithAuth("/user/messages/private", params);
    }

    /**
     * 获取与用户的私信
     * @param user_id
     * @param limit
     * @param offset
     * @returns {Promise<Promise<Response>>}
     */
    getPrivateMessageWithUser(user_id, limit, offset) {
        var params = new URLSearchParams();
        params.set('limit', limit);
        params.set('offset', offset);
        return this.httpProvider.httpGetWithAuth("/user/messages/private/"+user_id, params);
    }

    /**
     * 发送私信
     * @param body
     * @returns {Promise<Promise<Response>>}
     */
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

    /**
     * 获取水滴币明细
     * @param limit
     * @param offset
     * @returns {Promise<Promise<Response>>}
     */
    getCoins(limit, offset) {
        let params: URLSearchParams = new URLSearchParams();
        params.set('limit', limit);
        params.set('offset', offset);
        return this.httpProvider.httpGetWithAuth("/user/coins", params);
    }

    buyVip(body) {
        return this.httpProvider.httpPostWithAuth("/vip/buy", body);
    }

    deleteCheckin(id) {
        return this.httpProvider.httpDeleteWithAuth("/user/checkin/" + id);
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

    /**
     * 设置黑名单
     *
     * @param param
     * @returns {Promise<Promise<Response>>}
     */
    blacklistUser(id) {
        return this.httpProvider.httpPutWithAuth("/users/"+id+"/blacklist",null);
    }

    /**
     * 举报
     *
     * @param param
     * @returns {Promise<Promise<Response>>}
     */
    reportUser(id,body) {
        return this.httpProvider.httpPostWithAuth("/users/"+id+"/report", body);
    }


    /**
     * 更新本地用户
     * @param user
     * @returns {Promise<void>}
     */
    async setLocalUser(user:any) {
        if(!user) return;
        this.localUser = user;
        this.storage.set('user',user);
    }

    async getLocalUser() {
        if(!this.localUser) {
            this.localUser = await this.storage.get('user');
        }

        if(!this.localUser) {
            this.localUser = await this.getUserInfo();
        }

        console.log(this.localUser);

        return this.localUser;
    }

    /**
     * 获取TOKEN
     * @returns {Promise<any>}
     */
    async getToken() {
        if(this.token) {
            return this.token.access_token;
        }

        this.token = await this.storage.get("token");

        if(this.token) {
            return this.token.access_token;
        }

        // TODO 跳转到登录页面

        return null;
    }

    /**
     * 是否为当前用户
     *
     * @param id
     * @returns {boolean}
     */
    isLocalUser(id) {

        if(this.localUser) {
            if(this.localUser.id == id) {
                return true;
            }
        }

        return false;
    }

}
