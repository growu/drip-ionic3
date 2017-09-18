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

  API_URL = 'http://localhost:8102/api';

  constructor(
      private http: Http,
      private toastCtrl:ToastController) {
  }

  public httpGetWithAuth(url: string,params: URLSearchParams) {
    return this.storage.get("token").then(data=>{
      var headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Accept', 'application/x.drip.v2+json');
      headers.append('Authorization', 'Bearer '+data );
      let options = new RequestOptions({ headers: headers,search: params });
      return this.http.get(this.API_URL+url, options).toPromise()
          .then(res => this.handleSuccess(res.json()))
          .catch(err => this.handleError(err));
    });

  }
  public httpGetNoAuth(url: string,params: URLSearchParams) {

    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/x.drip.v2+json');

    let options = new RequestOptions({ headers: headers,search: params });
    return this.http.get(this.API_URL+url, options).toPromise()
        .then(res => this.handleSuccess(res.json()))
        .catch(err => this.handleError(err));
  }
  public httpPostNoAuth(url: string, body: any) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/x.drip.v2+json');
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.API_URL+url, body, options).toPromise()
        .then(res => this.handleSuccess(res.json()))
        .catch(err => this.handleError(err));
  }

  public httpPostWithAuth(body: any, url: string) {

    return this.storage.get("token").then(data=>{
      var headers = new Headers();
              headers.append('Content-Type', 'application/json');
              headers.append('Authorization', result.ID + '-' + result.UserToken);
              let options = new RequestOptions({ headers: headers });
              return this.http.post(url, body, options).toPromise()
                .then(res => this.handleSuccess(res.json()))
                .catch(err => this.handleError(err));
          });
  }

  public httpPatchWithAuth(body: any, url: string) {

    return this.storage.get("token").then(data=>{
      var headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', result.ID + '-' + result.UserToken);
      let options = new RequestOptions({ headers: headers });
      return this.http.patch(url, body, options).toPromise()
          .then(res => this.handleSuccess(res.json()))
          .catch(err => this.handleError(err));
    });
  }

  private handleSuccess(result) {
    console.log(result);
    return result;
  }


  private handleError(error: Response | any) {
    console.log(error);

    let msg = error.message || '请求地址错误';

    // if (error.status == 0) {
    //   msg = '请求地址错误';
    // }
    // if (error.status == 400) {
    //   msg = '请求无效';
    //   console.log('请检查参数类型是否匹配');
    // }
    // if (error.status == 404) {
    //   msg = '请求资源不存在';
    //   console.error(msg+'，请检查路径是否正确');
    // }

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
