import {Injectable} from '@angular/core';
import {VersionModel} from '../../models/version.model'

declare var chcp: any;

@Injectable()
export class VersionProvider {
    public version: VersionModel;

    constructor() {

    }

    init() {
        if (typeof chcp != "undefined") {
            const that = this;
            chcp.getVersionInfo((err, data) => {
                console.log(data);
                that.version.appVersion = data.appVersion;
                that.version.webVersion = data.currentWebVersion;
            });
        }
    }

    getVersion() {
        return this.version;
    }

    getAppVersion() {
        return this.version.appVersion;
    }

    getWebVersion() {
        return this.version.webVersion;
    }

}
