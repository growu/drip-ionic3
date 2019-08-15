import {Injectable} from '@angular/core';
import {HttpProvider} from "../http/http";

/*
  Generated class for the PayProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PayProvider {

    constructor(public httpProvider: HttpProvider) {
        console.log('Hello PayProvider Provider');
    }

    /**
     * 商品
     *
     * @param body
     * @returns {Promise<Promise<Response>>}
     */
    getRecharges() {
        return this.httpProvider.httpGetWithAuth("/pay/recharges",null);
    }

    /**
     * 下单
     *
     * @param body
     * @returns {Promise<Promise<Response>>}
     */
    order(body) {
        return this.httpProvider.httpPostWithAuth("/pay/order", body);
    }
}
