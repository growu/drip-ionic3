import {Injectable} from '@angular/core';
import {HttpProvider} from "../http/http";
import {URLSearchParams} from '@angular/http';

@Injectable()
export class TopProvider {

    constructor(private httpProvider: HttpProvider) {
    }

    /**
     * 获取排行榜用户
     *
     * @param mode
     * @param limit
     * @param offset
     * @returns {Promise<Promise<Response>>}
     */
    getTopUsers(mode, limit, offset) {
        var params = new URLSearchParams();
        params.set('limit', limit);
        params.set('offset', offset);
        return this.httpProvider.httpGetWithAuth("/top/" + mode, params);
    }

}
