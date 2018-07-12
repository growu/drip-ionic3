import { Injectable } from '@angular/core';
import {Platform} from "ionic-angular";

declare var cordova: any;

@Injectable()
export class AppConfigProvider {

  constructor(public platform: Platform) {
  }

  getChannel(): Promise<any> {
      return new Promise((resolve, reject) => {

          if(this.platform.is('cordova')) {
              cordova.plugins.AppConfig.fetch(['JPUSH_CHANNEL'], result=> {
                  if(result){
                      console.log(result);
                      if(result.JPUSH_CHANNEL) {
                          resolve(result.JPUSH_CHANNEL);
                      } else {
                          reject("web");
                      }
                  } else {
                      if(this.platform.is('ios')) {
                          resolve("appstore");
                      } else {
                          resolve("developer-default");
                      }
                  }
              });
          } else {
              resolve("web");
          }

      });
  }

}
