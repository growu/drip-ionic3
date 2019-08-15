import { Injectable } from '@angular/core';
import {HttpProvider} from "../http/http";

@Injectable()
export class MallProvider {

  constructor(private httpProvider: HttpProvider) {
  }

    getGoods() {
        return this.httpProvider.httpGetWithAuth("/mall", null);
    }

    getGoodDetail(id) {
        return this.httpProvider.httpGetWithAuth("/mall/goods/"+id, null);
    }

    doExchangeGood(id) {
        return this.httpProvider.httpPostWithAuth("/mall/good/"+id+"/exchange", null);
    }

    getOrders() {
        return this.httpProvider.httpGetWithAuth("/mall/exchanges", null);
    }


}
