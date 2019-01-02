import { Injectable } from '@angular/core';
import {Platform} from "ionic-angular";

declare var cordova: any;

@Injectable()
export class AppConfigProvider {

  constructor(public platform: Platform) {
  }

  getChannel(): Promise<any> {
      return new Promise((resolve, reject) => {

          if(this.platform.is('android')) {
              cordova.plugins.AppConfig.fetch(['JPUSH_CHANNEL'], result=> {
                  console.log(result);

                  if(result){
                      if(result.JPUSH_CHANNEL) {
                          resolve(result.JPUSH_CHANNEL);
                          return;
                      }
                  }
                  resolve("developer-default");
              });
          } else if(this.platform.is('ios')) {
              resolve("appstore");
          } else {
              resolve("web");
          }

      });
  }

}
