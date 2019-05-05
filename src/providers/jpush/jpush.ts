import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {JPush} from '@jiguang-ionic/jpush';

declare var cordova: any;

@Injectable()
export class JpushProvider {

  protected channel:string;

  constructor(public jpush: JPush) {
  }

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
      }).catch(err => {

      });

      cordova.plugins.AppConfig.fetch(['JPUSH_CHANNEL'], result=> {
          console.log(result);

          if(result){
              if(result.JPUSH_CHANNEL) {
                  this.channel = result.JPUSH_CHANNEL;
              }
          }
      });
  }

}
