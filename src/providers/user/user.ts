import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {SettingModel} from '../../models/setting.model'
import {Storage} from '@ionic/storage';
import {Device} from '@ionic-native/device';
import {HttpProvider} from '../http/http';
import {URLSearchParams} from '@angular/http';
import {Platform} from "ionic-angular";

declare var Wechat;
declare var WeiboSDK;
declare var QQSDK;

@Injectable()
export class UserProvider {

    constructor(public httpProvider: HttpProvider,
                private storage: Storage,
                private device: Device,
                private platform: Platform) {

    }

    login(user): Promise<any> {
        return new Promise((resolve, reject) => {
            this.getDevice().then((device) => {
                user.device = device;
                this.httpProvider.httpPostNoAuth("/auth/login", user).then((data) => {
                    resolve(data);
                }).catch((err) => {
                    reject(err);
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
                (<any>window).plugins.jPushPlugin.getRegistrationID((data) => {
                    console.log("获取极光推送ID" + data);
                    let device = {
                        cordova: this.device.cordova,
                        model: this.device.model,
                        platform: this.device.platform,
                        uuid: this.device.uuid,
                        version: this.device.version,
                        manufacturer: this.device.manufacturer,
                        isVirtual: this.device.isVirtual,
                        serial: this.device.serial,
                        push_id: data
                    };
                    resolve(device);
                });
            } else {
                resolve(null);
            }
        });
    }

    doThirdLogin(data,provider):Promise<any> {
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
                    this.doThirdLogin(response,'wechat').then((res)=>{
                        resolve(res);
                    }).catch((err)=>{
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
                    this.doThirdLogin(result,'qq').then((res)=>{
                        resolve(res);
                    }).catch((err)=>{
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

                    this.doThirdLogin(result,'weibo').then((res)=>{
                        resolve(res);
                    }).catch((err)=>{
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

    doWechatBind(): Promise<any> {
        return new Promise((resolve, reject) => {
            if (this.platform.is('cordova')) {
                var scope = "snsapi_userinfo",
                    state = "_" + (+new Date());

                Wechat.auth(scope, state, response => {
                    response.provider = 'wechat';
                    response.device = this.device;

                    this.httpProvider.httpPostWithAuth('/user/bind', response).then((data) => {
                        console.log(data);
                        resolve(data);
                    }).catch((err) => {
                        console.log(err);
                        reject(err);
                    });
                }, reason => {
                    reject(reason);
                });
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

                    result.provider = 'qq';
                    result.device = this.device;

                    this.httpProvider.httpPostWithAuth('/user/bind', result).then((data) => {
                        console.log(data);
                        resolve(data);
                    }).catch((err) => {
                        console.log(err);
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

    doWeiboBind(): Promise<any> {

        return new Promise((resolve, reject) => {
            if (this.platform.is('cordova')) {
                WeiboSDK.ssoLogin(result => {

                    result.provider = 'qq';
                    result.device = this.device;

                    this.httpProvider.httpPostWithAuth('/user/bind', result).then((data) => {
                        console.log(data);
                        resolve(data);
                    }).catch((err) => {
                        console.log(err);
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

    updateUser(id, body) {
        return this.httpProvider.httpPatchWithAuth("/user/" + id, body);
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

    unFollow(id) {
        return this.httpProvider.httpDeleteWithAuth("/user/follow/" + id).then(value => {
            return value;
        }).catch(e => {
            console.log(e)
        });
    }

    getGoals(data) {
        var params = new URLSearchParams();
        params.set('day', data);
        return this.httpProvider.httpGetWithAuth("/user/goals", params);
    }

    getGoal(id) {
        return this.httpProvider.httpGetWithAuth("/user/goal/" + id, null);
    }

    getGoalDay(id, day) {
        let params: URLSearchParams = new URLSearchParams();
        params.set('day', day);
        return this.httpProvider.httpGetWithAuth("/user/goal/" + id + "/day", params);
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
        }).catch(e => {
            console.log(e)
        });
    }

    checkinGoal(id, body) {
        return this.httpProvider.httpPostWithAuth("/user/goal/" + id + "/checkin", body).then(value => {
            return value;
        }).catch(e => {
            console.log(e)
        });
    }

    getGoalEvents(id, page, per_page) {
        let params: URLSearchParams = new URLSearchParams();
        params.set('page', page);
        params.set('per_page', per_page);
        return this.httpProvider.httpGetWithAuth("/user/goal/" + id + "/events", params);
    }

    getGoalChart(id, mode, day) {
        let params: URLSearchParams = new URLSearchParams();
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
            calendarMode: ""
        };

        return d;
    }

    updateSetting(data: SettingModel) {
        this.storage.set('setting', data);
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

    getLikeMessages(page, perPage) {
        var params = new URLSearchParams();
        params.set('page', page);
        params.set('per_page', perPage);
        return this.httpProvider.httpGetWithAuth("/user/messages/like", params);
    }

    getNewMessages() {
        return this.httpProvider.httpGetWithAuth("/user/messages/new", null);
    }

}
