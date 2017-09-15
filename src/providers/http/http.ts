import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Headers, RequestOptions,URLSearchParams} from '@angular/http';
import { ToastController } from 'ionic-angular';

import 'rxjs/add/operator/toPromise';

import { Storage } from '@ionic/storage';

@Injectable()
export class HttpProvider {
  myInfoLocal: any;
  host : string;

  API_URL = 'http://drip.growu.me/api';

  constructor(
      private http: Http,
      private toastCtrl:ToastController,
      private storage: Storage) {
    //this.local = new Storage(LocalStorage);
  }

  public httpGetWithAuth(url: string,params: URLSearchParams) {
    // let user = this.storageService.read<UserData>('UserInfo');
    // var headers = new Headers();
    // headers.append('Content-Type', 'application/json');
    // headers.append('Authorization', user.UserToken);
    // let options = new RequestOptions({ headers: headers,search: params });
    // return this.http.get(this.API_URL+url, options).toPromise()
    //     .then(res => {
    //       this.handleSuccess(res.json());
    //     })
    //     .catch(err => {
    //       this.handleError(err);
    //     });
  }
  public httpGetNoAuth(url: string,params: URLSearchParams) {

    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers,search: params });
    return this.http.get(this.API_URL+url, options).toPromise()
        .then(res => this.handleSuccess(res.json()))
        .catch(err => this.handleError(err));
  }
  public httpPostNoAuth(url: string, body: any) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.API_URL+url, body, options).toPromise()
        .then(res => this.handleSuccess(res.json()))
        .catch(err => this.handleError(err));
  }

  public httpPostWithAuth(body: any, url: string) {

      // return this.myInfoLocal = this.local.getJson('UserInfo')
      //     .then((result) => {
      //         var headers = new Headers();
      //         headers.append('Content-Type', 'application/json');
      //         headers.append('Authorization', result.ID + '-' + result.UserToken);
      //         let options = new RequestOptions({ headers: headers });
      //         return this.http.post(url, body, options).toPromise();
      //     });
  }

  private handleSuccess(result) {

    if(result && result.hasOwnProperty("status")) {

      if( !result.status ) {
        console.log(result.status);

        let toast = this.toastCtrl.create({
          message: result.message,
          duration: 3000,
          position: 'middle',
          showCloseButton: true,
          closeButtonText: '关闭'
        });
        toast.present();
      }
    }
    return result;
  }


  private handleError(error: Response | any) {
    console.log(error);

    let msg = '请求失败';

    if (error.status == 0) {
      msg = '请求地址错误';
    }
    if (error.status == 400) {
      msg = '请求无效';
      console.log('请检查参数类型是否匹配');
    }
    if (error.status == 404) {
      msg = '请求资源不存在';
      console.error(msg+'，请检查路径是否正确');
    }

    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'middle',
      showCloseButton: true,
      closeButtonText: '关闭'
    });

    toast.present();

    return {status: false, message: msg};
  }
}
