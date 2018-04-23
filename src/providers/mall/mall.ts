import { Injectable } from '@angular/core';
import {HttpProvider} from "../http/http";

@Injectable()
export class MallProvider {

  constructor(private httpProvider: HttpProvider) {
  }

    getGoods() {
        return this.httpProvider.httpGetWithAuth("/mall/goods", null);
    }

    getGoodDetail(id) {
        return this.httpProvider.httpGetWithAuth("/mall/good/"+id, null);
    }

    doExchangeGood(id) {
        return this.httpProvider.httpPostWithAuth("/mall/good/"+id+"/exchange", null);
    }

    getExchanges() {
        return this.httpProvider.httpGetWithAuth("/mall/exchanges", null);
    }

    getRecharges() {
        return this.httpProvider.httpGetWithAuth("/wechat/recharges", null);
    }

    pay(body) {
        return this.httpProvider.httpPostWithAuth("/wechat/pay", body);
    }
}
