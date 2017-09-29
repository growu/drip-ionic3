import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { SettingModel } from '../../models/setting.model'
import { Storage } from '@ionic/storage';
import { Device } from '@ionic-native/device';
import { HttpProvider } from '../http/http';
import { URLSearchParams } from '@angular/http';
import { Platform } from "ionic-angular";
import { Http, Response } from '@angular/http';

declare var Wechat;
declare var WeiboSDK;
declare var QQSDK;


@Injectable()
export class UserProvider {

  constructor(public httpProivder: HttpProvider,
              private storage: Storage,
              private device: Device,
              private platform: Platform,
              private http: Http) {
  }

  login(user) {
    user.device = this.device;
    return this.httpProivder.httpPostNoAuth("/auth/login", user);
  }

  doWechatLogin():Promise<any> {

    return new Promise((resolve, reject) => {
        if(this.platform.is('cordova')) {

          var scope = "snsapi_userinfo",
              state = "_" + (+new Date());

          Wechat.auth(scope, state, function (response) {
            alert(JSON.stringify(response));
            resolve(response);
          }, function (reason) {
            alert("Failed: " + reason);
            reject(reason);
          });

        } else {
          reject("非cordova平台");
        }

      });
  }

  doQQLogin():Promise<any> {
    return new Promise((resolve, reject) => {
      if(this.platform.is('cordova')) {

        var args = {
          client:QQSDK.ClientType.QQ
        };

        QQSDK.ssoLogin(function (result) {
          alert('token is ' + result.access_token);
          alert('userid is ' + result.userid);
          alert('expires_time is ' + new Date(parseInt(result.expires_time)) + ' TimeStamp is ' + result.expires_time);

          var url = "https://graph.qq.com/user/get_user_info?access_token=" + result.access_token + "&oauth_consumer_key=1104758278&openid=" + result.userid;
          this.http.get(url, {}).toPromise()
              .then(res => {
                resolve(res);
              })
              .catch(err => {
                reject(err);
              });
        }, function (failReason) {
          alert(failReason);
          reject(failReason);

        }, args);

      } else {
        reject("非cordova平台");
      }

    });
  }


  doWeiboLogin():Promise<any> {
    return new Promise((resolve, reject) => {
      if(this.platform.is('cordova')) {

        var scope = "snsapi_userinfo",
            state = "_" + (+new Date());

        WeiboSDK.ssoLogin(function (args) {
          alert('access token is ' + args.access_token);
          alert('userId is ' + args.userId);
          alert('expires_time is ' + new Date(parseInt(args.expires_time)) + ' TimeStamp is ' + args.expires_time);

          let url = 'https://api.weibo.com/2/users/show.json?uid=' + args.userId + '&&access_token=' + args.access_token;

          this.http.get(url, {}).toPromise()
              .then(res => {
                resolve(res);
              })
              .catch(err => {
                reject(err);
              });
        }, function (failReason) {
          alert(failReason);
          reject(failReason);
        });
      } else {
        reject("非cordova平台");
      }

    });
  }

  checkWechatInstalled():Promise<any> {
    return new Promise<any>((resolve, reject) => {

      if(this.platform.is('cordova')) {
        Wechat.isInstalled(function (installed) {
          alert("Wechat installed: " + (installed ? "Yes" : "No"));
          resolve(true);
        }, function (reason) {
          alert("Failed: " + reason);
          reject(reason);
        });
      } else {
        reject("非cordova平台");
      }
    });

  }

  checkQQInstalled():Promise<any> {
    return new Promise<any>((resolve, reject) => {

      if(this.platform.is('cordova')) {
        var args = {
          client :QQSDK.ClientType.QQ
        }

        QQSDK.checkClientInstalled(function () {
          alert('client is installed');
          resolve(true);
        }, function (reason) {
          // if installed QQ Client version is not supported sso,also will get this error
          alert('client is not installed');
          reject(reason);

        }, args);

      } else {
        reject("非cordova平台");
      }
    });

  }

  doThirdLogin(provider,data) {
    // var loginData = {};
    data.provider = provider;
    data.device = this.device;

    return this.httpProivder.httpPostNoAuth('auth/oauth',data);
  }

  register(user) {
    user.device = this.device;
    return this.httpProivder.httpPostNoAuth("/auth/register", user);
  }

  forget(user) {
    user.device = this.device;
    return this.httpProivder.httpPostNoAuth("/auth/forget", user);
  }

  getUser(id) {
    return this.httpProivder.httpGetWithAuth("/user/"+id,null);
  }

  getCode(object,type) {
    let param = {
      object:object,
      type:type
    };

    let body = JSON.stringify(param);

    return this.httpProivder.httpPostNoAuth("/auth/code", body);
  }


  follow(id) {
    return this.httpProivder.httpPutWithAuth("/user/follow/"+id, null).then(value=>{
      return value;
    }).catch(e=>{console.log(e)});;
  }

  unFollow(id) {
    return this.httpProivder.httpDeleteWithAuth("/user/follow/"+id).then(value=>{
      return value;
    }).catch(e=>{console.log(e)});
  }

  getGoals(data){
    var params = new URLSearchParams();
    params.set('day',data);
    return this.httpProivder.httpGetWithAuth("/user/goals",params);
  }

  getGoal(id){
    return this.httpProivder.httpGetWithAuth("/user/goal/"+id,null);
  }

  getGoalDay(id,day){
    let params: URLSearchParams = new URLSearchParams();
    params.set('day',day);
    return this.httpProivder.httpGetWithAuth("/user/goal/"+id+"/day",params);
  }

  getGoalWeek(id){
    return this.httpProivder.httpGetWithAuth("/user/goal/"+id+"/week",null);
  }

  getGoalCalendar(id){
    return this.httpProivder.httpGetWithAuth("/user/goal/"+id+"/calendar",null);
  }

  deleteGoal(id) {
    return this.httpProivder.httpDeleteWithAuth("/user/goal/"+id).then(value=>{
      return value;
    }).catch(e=>{console.log(e)});
  }

  checkinGoal(id,body) {
    return this.httpProivder.httpPostWithAuth("/user/goal/"+id+"/checkin",body).then(value=>{
      return value;
    }).catch(e=>{console.log(e)});
  }

  getGoalEvents(id,page,per_page){
    let params: URLSearchParams = new URLSearchParams();
    params.set('page',page);
    params.set('per_page',per_page);
    return this.httpProivder.httpGetWithAuth("/user/goal/"+id+"/events",params);
  }

  getGoalChart(id,mode,day){
    let params: URLSearchParams = new URLSearchParams();
    params.set('mode',mode);
    params.set('day',day);
    return this.httpProivder.httpGetWithAuth("/user/goal/"+id+"/chart",params);
  }

  getGoalsCalendar(start_date,end_date){
    let params: URLSearchParams = new URLSearchParams();
    params.set('start_date',start_date);
    params.set('end_date',end_date);
    return this.httpProivder.httpGetWithAuth("/user/goals/calendar",params);
  }

  updateGoal(id,body){
    return this.httpProivder.httpPatchWithAuth("/user/goal/"+id,body);
  }

  getSetting() {
   return this.storage.get('setting');
  }

  getDefaultSetting():SettingModel{

    var d = <SettingModel> {
      viewMode:"list",
      calendarMode:"week"
    };

    return d;
  }

  updateSetting(data:SettingModel) {
    this.storage.set('setting', data);
  }

  getFanMessages(page,perPage){
    var params = new URLSearchParams();
    params.set('page',page);
    params.set('per_page',perPage);
    return this.httpProivder.httpGetWithAuth("/user/messages/fan",params);
  }

  getCommentMessages(page,perPage){
    var params = new URLSearchParams();
    params.set('page',page);
    params.set('per_page',perPage);
    return this.httpProivder.httpGetWithAuth("/user/messages/comment",params);
  }

  getLikeMessages(page,perPage){
    var params = new URLSearchParams();
    params.set('page',page);
    params.set('per_page',perPage);
    return this.httpProivder.httpGetWithAuth("/user/messages/like",params);
  }

}
