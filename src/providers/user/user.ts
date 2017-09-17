import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { SettingModel } from '../../models/setting.model'
import { Storage } from '@ionic/storage';

import { HttpProvider } from '../http/http';

@Injectable()
export class UserProvider {

  constructor(public httpProivder: HttpProvider,private storage: Storage) {
  }

  login(user) {
    return this.httpProivder.httpPostNoAuth("/auth/login", user);
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
