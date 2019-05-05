///<reference path="../../../node_modules/rxjs/internal/Observable.d.ts"/>
import {Injectable, Injector} from '@angular/core';
import {Http, Response} from '@angular/http';
// import { Observable } from 'rxjs/Observable';
import {throwError} from 'rxjs';
import {Headers, RequestOptions, URLSearchParams} from '@angular/http';
import {App, NavController, Platform, ToastController} from 'ionic-angular';

import 'rxjs/add/operator/toPromise';

import {Storage} from '@ionic/storage';

@Injectable()
export class HttpProvider {
    host: string;
    API_URL = 'http://localhost:8000/api';
    // API_URL = 'http://drip.growu.me/api';

    constructor(private http: Http,
                private platform:Platform,
                private toastCtrl: ToastController,
                protected injector: Injector,
                protected app: App,
                private storage: Storage) {

            // cordova.plugins.AppConfig.fetch(['JPUSH_CHANNEL'], result=> {
            //     if(result){
            //         console.log(result);
            //         if(result.JPUSH_CHANNEL) {
            //             this.channel = result.JPUSH_CHANNEL;
            //         }
            //     } else {
            //         if(this.platform.is('ios')) {
            //             this.channel = "appstore";
            //         } else {
            //             this.channel = "default";
            //         }
            //     }
            // });
    }

    public httpGetWithAuth(url: string, params: URLSearchParams) {
        return this.storage.get("token").then(data => {

            if(!data) {
                this.app.getRootNav().setRoot('login');
                return;
            }

            var headers = new Headers();
            headers.append('Content-Type', 'application/json');
            headers.append('Accept', 'application/x.drip.v3+json');
            headers.append('Authorization', 'Bearer ' + data.access_token);
            let options = new RequestOptions({headers: headers, search: params});
            return this.http.get(this.API_URL + url, options).toPromise()
                .then(this.extractData)
                .catch(err => this.handleError(err));
        });
    }

    public httpGetNoAuth(url: string, params: URLSearchParams) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/x.drip.v3+json');
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
        // headers.append('Accept', 'application/x.drip.v3+json');
        let options = new RequestOptions({headers: headers});
        return this.http.post(this.API_URL + url, body, options).toPromise()
            .then(this.extractData)
            .catch(err => this.handleError(err));
    }

    public httpPostWithAuth(url: string, body: any) {
        return this.storage.get("token").then(data => {

            if(!data) {
                this.app.getRootNav().setRoot('login');
                return;
            }

            var headers = new Headers();
            headers.append('Content-Type', 'application/json');
            headers.append('Accept', 'application/x.drip.v3+json');
            headers.append('Authorization', 'Bearer ' + data.access_token);
            let options = new RequestOptions({headers: headers});
            return this.http.post(this.API_URL + url, body, options).toPromise()
                .then(this.extractData)
                .catch(err => this.handleError(err));
        });
    }

    public httpPutWithAuth(url: string, body: any) {

        return this.storage.get("token").then(data => {

            if(!data) {
                this.app.getRootNav().setRoot('login');
                return;
            }

            var headers = new Headers();
            headers.append('Content-Type', 'application/json');
            headers.append('Accept', 'application/x.drip.v3+json');
            headers.append('Authorization', 'Bearer ' + data.access_token);
            let options = new RequestOptions({headers: headers});
            return this.http.put(this.API_URL + url, body, options).toPromise()
                .then(this.extractData)
                .catch(err => this.handleError(err));
        });
    }

    public httpDeleteWithAuth(url: string) {

        return this.storage.get("token").then(data => {

            if(!data) {
                this.app.getRootNav().setRoot('login');
                return;
            }

            var headers = new Headers();
            headers.append('Content-Type', 'application/json');
            headers.append('Accept', 'application/x.drip.v3+json');
            headers.append('Authorization', 'Bearer ' + data.access_token);
            let options = new RequestOptions({headers: headers});
            return this.http.delete(this.API_URL + url, options).toPromise()
                .then(this.extractData)
                .catch(err => this.handleError(err));
        });
    }

    public httpPatchWithAuth(url: string, body: any) {

        return this.storage.get("token").then(data => {

            if(!data) {
                this.app.getRootNav().setRoot('login');
                return;
            }

            var headers = new Headers();
            headers.append('Content-Type', 'application/json');
            headers.append('Accept', 'application/x.drip.v3+json');
            headers.append('Authorization', 'Bearer ' + data.access_token);
            let options = new RequestOptions({headers: headers});
            return this.http.patch(this.API_URL + url, body, options).toPromise()
                .then(this.extractData)
                .catch(err => this.handleError(err));
        });
    }

    private extractData(res: Response) {
        return res.text() ? res.json() : {};
    }

    private handleError(error: Response | any){
        console.log(error);
        console.log(error.url);

        if (error.status == 200) {
            return Promise.resolve("success");
        }

        let msg = error.text ? error.json().message : '请求地址错误';

        if (error.status == 400) {
            this.app.getRootNav().setRoot('login');
        }

        if(error.status == 401) {
            console.log("Token过期,尝试刷新Token");
           return this.refreshToken();
        }

        if(msg) {
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

    private refreshToken():Promise<any>{

        return new Promise((resolve, reject) => {

            this.storage.get("token").then(data => {
                var headers = new Headers();
                headers.append('Content-Type', 'application/json');
                headers.append('Accept', 'application/x.drip.v3+json');
                headers.append('Authorization', 'Bearer ' + data.access_token);
                let options = new RequestOptions({headers: headers});
                return this.http.post(this.API_URL + '/auth/refresh', null, options).toPromise()
                    .then(res=>{
                        console.log(res);
                        this.storage.set('token',res.json());
                        // this.app.getRootNav().setRoot(this.app.getActiveNav());
                        window.location.reload();
                        reject("refresh token");
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

                        reject(err);

                    });
            });
        });
    }


}
