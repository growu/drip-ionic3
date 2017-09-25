import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { SettingModel } from '../../models/setting.model'
import { Storage } from '@ionic/storage';
import { Device } from '@ionic-native/device';
import { HttpProvider } from '../http/http';
import { URLSearchParams } from '@angular/http';

@Injectable()
export class UserProvider {

  constructor(public httpProivder: HttpProvider,
              private storage: Storage,
              private device: Device) {
  }

  login(user) {
    user.device = this.device;
    return this.httpProivder.httpPostNoAuth("/auth/login", user);
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

  getGoalWeek(id){
    return this.httpProivder.httpGetWithAuth("/user/goal/"+id+"/week",null);
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
