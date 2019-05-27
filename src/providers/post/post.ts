import { Injectable } from '@angular/core';
import {HttpProvider} from "../http/http";
import {URLSearchParams} from '@angular/http';

@Injectable()
export class PostProvider {

  constructor(public httpProvider: HttpProvider) {
  }

    /**
     * 获取单个文章
     * @returns {Promise<Promise<Response>>}
     */
    getOne(id) {
        return this.httpProvider.httpGetWithAuth("/posts/"+id, null);
    }

    /**
     * 获取所有文章
     * @returns {Promise<Promise<Response>>}
     */
    getAll() {
        return this.httpProvider.httpGetWithAuth("/posts", null);
    }

    /**
     * 点赞
     * @param id
     * @returns {Promise<Response>}
     */
    like(id) {
        return this.httpProvider.httpPutWithAuth("/posts/" + id + "/like", null);
    }

    /**
     * 取消点赞
     * @param id
     * @returns {Promise<Response>}
     */
    unLike(id) {
        return this.httpProvider.httpDeleteWithAuth("/posts/" + id + "/like");
    }

    /**
     * 评论
     * @param id
     * @param param
     * @returns {Promise<Promise<Response>>}
     */
    comment(id, param) {
        // let body = JSON.stringify(param);
        return this.httpProvider.httpPostWithAuth("/posts/" + id + "/comment", param);
    }

    /**
     * 获取评论
     * @param id
     * @param param
     * @returns {Promise<Promise<Response>>}
     */
    getComments(id, limit,offset) {
        let params:URLSearchParams = new URLSearchParams();
        params.set('limit',limit);
        params.set('offset',offset);
        return this.httpProvider.httpGetWithAuth("/posts/" + id + "/comments", params);
    }


}
