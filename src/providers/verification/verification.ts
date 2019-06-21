import { Injectable } from '@angular/core';
import {HttpProvider} from "../http/http";

@Injectable()
export class VerificationProvider {

  constructor(public httpProvider: HttpProvider) {
    console.log('Hello VerificationProvider Provider');
  }

  /**
   * 发送验证码
   * @param account
   * @param type
   * @returns {Promise<Response>}
   */
  send(account,type) {
      let param = {
          account: account,
          type: type
      };
      let body = JSON.stringify(param);

      return this.httpProvider.httpPostNoAuth("/verification/send", body);
  }

    /**
     * 验证验证码
     * @param account
     * @param type
     * @returns {Promise<Response>}
     */
    verify(account,code,type) {
        let param = {
            account: account,
            type: type,
            code:code
        };
        let body = JSON.stringify(param);

        return this.httpProvider.httpPostNoAuth("/verification/verify", body);
    }

}
