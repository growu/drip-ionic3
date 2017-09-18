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

  getGoals(date){
    var params = new URLSearchParams();
    params.set('day',date);
    return this.httpProivder.httpGetWithAuth("/user/goals",params);
  }

  getGoalsCalendar(start_date,end_date){
    let params: URLSearchParams = new URLSearchParams();
    params.set('start_date',start_date);
    params.set('end_date',end_date);
    return this.httpProivder.httpGetWithAuth("/user/goals/calendar",params);
  }

  updateGoal(goal){
    return this.httpProivder.httpPatchWithAuth("/user/goal/"+goal.id,goal);
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

}
