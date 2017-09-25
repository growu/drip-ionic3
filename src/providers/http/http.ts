import { Injectable,Injector } from '@angular/core';
import { Http, Response } from '@angular/http';
// import { Observable } from 'rxjs/Observable';
import { Observable } from 'rxjs/Rx'
import { Headers, RequestOptions,URLSearchParams} from '@angular/http';
import { App,NavController,ToastController } from 'ionic-angular';

import 'rxjs/add/operator/toPromise';

import { Storage } from '@ionic/storage';

@Injectable()
export class HttpProvider {
  myInfoLocal: any;
  host : string;

  API_URL = 'http://localhost:8104/api';

  constructor(
      private http: Http,
      private toastCtrl:ToastController,
      protected injector: Injector,
      protected app: App,
      private storage:Storage) {
  }

  public httpGetWithAuth(url: string,params: URLSearchParams) {
    return this.storage.get("token").then(data=>{
      var headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Accept', 'application/x.drip.v2+json');
      headers.append('Authorization', 'Bearer '+data );
      let options = new RequestOptions({ headers: headers,search: params });
      return this.http.get(this.API_URL+url, options).toPromise()
          .then(res => this.handleSuccess(res))
          .catch(err => {this.handleError(err)});
    });

  }
  public httpGetNoAuth(url: string,params: URLSearchParams) {

    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/x.drip.v2+json');

    let options = new RequestOptions({ headers: headers,search: params });
    return this.http.get(this.API_URL+url, options).toPromise()
        .then(res => this.handleSuccess(res))
        .catch(err => {this.handleError(err)});
  }
  public httpPostNoAuth(url: string, body: any) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/x.drip.v2+json');
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.API_URL+url, body, options).toPromise()
        .then(res => this.handleSuccess(res))
        .catch(err => {this.handleError(err)});
  }

  public httpPostWithAuth( url: string,body: any) {

    return this.storage.get("token").then(data=>{
      var headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Accept', 'application/x.drip.v2+json');
      headers.append('Authorization', 'Bearer '+data );
      let options = new RequestOptions({ headers: headers });
              return this.http.post(this.API_URL+url, body, options).toPromise()
                  .then(res => this.handleSuccess(res))
                .catch(err => {this.handleError(err)});
          });
  }

  public httpPutWithAuth( url: string,body: any) {

    return this.storage.get("token").then(data=>{
      var headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Accept', 'application/x.drip.v2+json');
      headers.append('Authorization', 'Bearer '+data );
      let options = new RequestOptions({ headers: headers });
      return this.http.put(this.API_URL+url, body, options).toPromise()
          .then(res => this.handleSuccess(res))
          .catch(err => this.handleError(err));
    });
  }

  public httpDeleteWithAuth( url: string) {

    return this.storage.get("token").then(data=>{
      var headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Accept', 'application/x.drip.v2+json');
      headers.append('Authorization', 'Bearer '+data );
      let options = new RequestOptions({ headers: headers });
      return this.http.delete(this.API_URL+url, options).toPromise()
          .then(res => this.handleSuccess(res))
          .catch(err => {this.handleError(err)});
    });
  }

  public httpPatchWithAuth(url: string,body: any) {

    return this.storage.get("token").then(data=>{
      var headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Accept', 'application/x.drip.v2+json');
      headers.append('Authorization', 'Bearer '+data );
      let options = new RequestOptions({ headers: headers });
      return this.http.patch(this.API_URL+url, body, options).toPromise()
          .then(res => this.handleSuccess(res))
          .catch(err => this.handleError(err));
    });
  }

  private handleSuccess(result) {
    return result.text() ? result.json() : {};
  }

  private handleError(error: Response | any){
    console.log(error);

    let msg = error.text()?error.json().message:'请求地址错误';

    if (error.status == 400) {
      this.app.getActiveNav().push('login-default');
    }

    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'middle',
      showCloseButton: false,
      closeButtonText: '关闭'
    });

    toast.present();

    return Observable.throw(msg);
    // return Promise.reject(msg);

  }
}
