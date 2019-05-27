import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {HttpProvider} from "../http/http";

@Injectable()
export class CommentProvider {

    constructor(public http: Http, public httpProvider: HttpProvider) {
    }

    /**
     * 回复评论
     * @param id
     * @param content
     * @returns {Promise<Promise<Response>>}
     */
    reply(id, content) {
        return this.httpProvider.httpPostWithAuth("/comments/" + id + "/reply", {'content': content});
    }

    /**
     * 点赞
     * @param id
     * @returns {Promise<Promise<Response>>}
     */
    like(id) {
        return this.httpProvider.httpPutWithAuth("/comments/" + id + "/like", null);
    }

    /**
     * 取消点赞
     * @param id
     * @returns {Promise<Promise<Response>>}
     */
    unLike(id) {
        return this.httpProvider.httpDeleteWithAuth("/comments/" + id + "/like");
    }

}
