import {Injectable} from '@angular/core';
import {JpushProvider} from "../jpush/jpush";
import {HttpProvider} from "../http/http";
import {URLSearchParams} from '@angular/http';
import {Platform} from "ionic-angular";

declare var chcp: any;

@Injectable()
export class VersionProvider {
    private version: any;
    private isAudit:boolean = false;

    constructor(private jpushProvider: JpushProvider,
                private platform: Platform,
                private httpProvider: HttpProvider) {

    }

    /**
     * 初始化
     */
    init() {
        if (typeof chcp != "undefined") {
            const that = this;
            chcp.getVersionInfo((err, data) => {
                console.log(data);
                that.version = data;
            });
        }
    }

    /**
     * 获取VERSION
     * @returns {{appVersion: (any | string); webVersion: any}}
     */
    getVersion() {
        if(this.platform.is('cordova')) {
            return {
                appVersion: this.version.appVersion,
                webVersion: this.version.currentWebVersion
            };
        } else {
            return null;
        }

    }

    /**
     * 获取APP VERSION
     * @returns {any | string}
     */
    getAppVersion() {
        if(this.version) {
            return this.version.appVersion;
        } else {
            return null;
        }
    }

    /**
     * 获取WEB VERSION
     * @returns {any | string}
     */
    getWebVersion(format:boolean = false) {
        if(this.version) {
            let version =  this.version.currentWebVersion;

            if(format) {
                version = version.replace(/-/g, '').replace(/\./g, '');
            }

            return version;
        } else {
            return null;
        }
    }

    /**
     * 检查更新
     * @param appVersion
     * @param webVersion
     * @returns {Promise<Promise<Response>>}
     */
    checkVersion() {
        let params: URLSearchParams = new URLSearchParams();
        params.set('app_version', this.version.appVersion);
        params.set('web_version', this.version.currentWebVersion);
        params.set('channel', this.jpushProvider.getChannel());
        // params.set('app_version', '3.0.1');
        // params.set('web_version',null);
        // params.set('channel','appstore');
        return this.httpProvider.httpGetWithAuth("/version", params);
    }

    /**
     * 设置审核状态
     * @param value
     */
    setAudit(value) {
        this.isAudit = value;
    }

    /**
     * 获取审核状态
     * @param value
     */
    getAudit() {
        return this.isAudit;
    }
}
