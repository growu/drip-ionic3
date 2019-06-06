import {Injectable, Injector} from '@angular/core';
import {Http, RequestOptionsArgs, Response} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/Rx';

import {Headers, RequestOptions, URLSearchParams} from '@angular/http';
import {App, ToastController} from 'ionic-angular';

import 'rxjs/add/operator/toPromise';

import {Storage} from '@ionic/storage';

@Injectable()
export class HttpProvider {
    host: string;
    // API_URL = 'http://localhost:8000/api';
    API_URL = 'https://drip.growu.me/api';
    token: any;

    constructor(private http: Http,
                private toastCtrl: ToastController,
                protected injector: Injector,
                protected app: App,
                private storage: Storage) {

    }

    public httpGetNoAuth(url: string, params: URLSearchParams) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/x.drip.v1+json');
        let options = new RequestOptions({headers: headers, search: params});
        return this.http.get(this.API_URL + url, options).toPromise()
            .then(this.extractData)
            .catch(err => this.handleError(err));
    }

    public httpGetNoAuth2(url: string) {
        return this.http.get(url, {}).toPromise()
            .then(this.extractData)
            .catch(err => this.handleError(err));
    }

    public httpPostNoAuth(url: string, body: any) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({headers: headers});
        return this.http.post(this.API_URL + url, body, options).toPromise()
            .then(this.extractData)
            .catch(err => this.handleError(err));
    }

    /**
     * get 提交
     * @param {string} url
     * @param {URLSearchParams} params
     * @returns {Promise<never | Response>}
     */
    public async httpGetWithAuth(url: string, params: URLSearchParams) {
        let options = await this.getAuthRequestOptions(params);
        return this.http.get(this.API_URL + url, options).toPromise()
            .then(this.extractData)
            .catch(err => this.handleError(err));
    }

    /**
     * post 提交
     * @param {string} url
     * @param body
     * @returns {Promise<never | Response>}
     */
    public async httpPostWithAuth(url: string, body: any) {
        let options = await this.getAuthRequestOptions();
        return this.http.post(this.API_URL + url, body, options).toPromise()
            .then(this.extractData)
            .catch(err => this.handleError(err));
    }

    /**
     * put 提交
     * @param {string} url
     * @param body
     * @returns {Promise<never | Response>}
     */
    public async httpPutWithAuth(url: string, body: any) {
        let options = await this.getAuthRequestOptions();
        return this.http.put(this.API_URL + url, body, options).toPromise()
            .then(this.extractData)
            .catch(err => this.handleError(err));
    }

    /**
     * delete 提交
     * @param {string} url
     * @returns {Promise<never | Response>}
     */
    public async httpDeleteWithAuth(url: string) {
        let options = await this.getAuthRequestOptions();
        return this.http.delete(this.API_URL + url, options).toPromise()
            .then(this.extractData)
            .catch(err => this.handleError(err));
    }

    /**
     * patch 提交
     * @param {string} url
     * @param body
     * @returns {Promise<never | Response>}
     */
    public async httpPatchWithAuth(url: string, body: any) {
        let options = await this.getAuthRequestOptions();
        return this.http.patch(this.API_URL + url, body, options).toPromise()
            .then(this.extractData)
            .catch(err => this.handleError(err));
    }

    /**
     * 获取请求选项
     * @returns {Promise<RequestOptions>}
     */
    protected async getAuthRequestOptions(params = null) {
        let token = await this.storage.get("token");
        if (!token) {
            this.app.getRootNav().setRoot('login');
            return;
        }

        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/x.drip.v1+json');
        headers.append('Authorization', 'Bearer ' + token.access_token);

        var args:RequestOptionsArgs = {headers:headers}
        if (params) {
            args.params = params;
        }

        let options = new RequestOptions(args);

        return options;
    }

    /**
     * 处理数据
     * @param {Response} res
     * @returns {{}}
     */
    private extractData(res: Response) {
        return res.text() ? res.json() : {};
    }

    /**
     * 错误处理
     * @param {Response | any} error
     * @returns {any}
     */
    private handleError(error: Response | any) {
        console.log(error);
        console.log(error.url);

        if (error.status == 200) {
            return Promise.resolve("success");
        }

        let msg = error.text ? error.json().message : '请求地址错误';

        if (error.status == 400) {
            this.app.getRootNav().setRoot('login');
        }

        if (error.status == 401) {
            console.log("Token过期,尝试刷新Token");
            this.refreshToken();
        }

        if (msg) {
            let toast = this.toastCtrl.create({
                message: msg,
                duration: 3000,
                position: 'top',
                cssClass: 'my-toast my-toast-error'
            });

            toast.present();
        }

        return Promise.reject(msg);
    }

    /**
     * 刷新TOKEN
     * @returns {Promise<never | Response>}
     */
    private async refreshToken() {

        let options = await this.getAuthRequestOptions();

        return this.http.post(this.API_URL + '/auth/refresh', null, options).toPromise()
            .then(res => {
                console.log(res);
                this.storage.set('token', res.json());
                setTimeout(()=>{
                    window.location.reload();
                },1000)
            })
            .catch(err => {
                console.log("刷新token失败,跳转到登录页面...");
                console.log(err);

                let toast = this.toastCtrl.create({
                    message: "登录信息失效，请重新登录",
                    duration: 3000,
                    position: 'top',
                    cssClass: 'my-toast my-toast-error'
                });

                toast.present();

                this.app.getRootNav().setRoot('login');
            });
    }
}
