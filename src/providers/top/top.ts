import { Injectable } from '@angular/core';
import {HttpProvider} from "../http/http";
import {URLSearchParams} from '@angular/http';

@Injectable()
export class TopProvider {

  constructor(private httpProvider: HttpProvider) {
  }

    getTopUsers(mode,page, perPage) {
        var params = new URLSearchParams();
        params.set('page', page);
        params.set('per_page', perPage);
        return this.httpProvider.httpGetWithAuth("/top/"+mode, params);
    }

}
