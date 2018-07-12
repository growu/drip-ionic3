import {Injectable} from '@angular/core';
import {Device} from '@ionic-native/device';
import {HttpProvider} from "../http/http";
import {URLSearchParams} from '@angular/http';
import {AppConfigProvider} from "../appconfig/appconfig";

@Injectable()
export class UpdateProvider {

    constructor(private httpProvider: HttpProvider,
                private appConfigProvider: AppConfigProvider,
                private device: Device) {
    }

    checkUpdate(appVersion, webVersion) {
        let params: URLSearchParams = new URLSearchParams();
        params.set('app_version', appVersion);
        params.set('web_version', webVersion);
        params.set('platform', this.device.platform);

        return this.appConfigProvider.getChannel().then(channel=>{
            params.set('channel', channel);
            return this.httpProvider.httpGetWithAuth("/update/check", params);
        });
    }

}
