import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {HttpProvider} from '../http/http';
import {URLSearchParams} from '@angular/http';

@Injectable()
export class EventProvider {

    constructor(public httpProvider: HttpProvider) {
    }

    /**
     * 点赞
     * @param id
     * @returns {Promise<Response>}
     */
    like(id) {
        return this.httpProvider.httpPutWithAuth("/events/" + id + "/like", null);
    }

    /**
     * 取消点赞
     * @param id
     * @returns {Promise<Response>}
     */
    unLike(id) {
        return this.httpProvider.httpDeleteWithAuth("/events/" + id + "/like");
    }

    /**
     * 获取动态
     * @param page
     * @param limit
     * @param offset
     * @returns {Promise<Response>}
     */
    getEvents(page, limit, offset) {
        let params: URLSearchParams = new URLSearchParams();
        params.set('limit', limit);
        params.set('offset',offset);
        return this.httpProvider.httpGetWithAuth("/events/" + page, params);
    }

    /**
     * 获取动态详情
     * @param id
     * @returns {Promise<Response>}
     */
    getEventDetail(id) {
        return this.httpProvider.httpGetWithAuth("/events/" + id, null);
    }

    /**
     * 获取点赞列表
     * @param id
     * @param limit
     * @param offset
     * @returns {Promise<Response>}
     */
    getEventLikes(id, limit, offset) {
        let params: URLSearchParams = new URLSearchParams();
        params.set('limit', limit);
        params.set('offset', offset);
        return this.httpProvider.httpGetWithAuth("/events/" + id + '/likes', params);
    }

    /**
     * 获取评论列表
     * @param id
     * @param limit
     * @param offset
     * @returns {Promise<Response>}
     */
    getEventComments(id, limit, offset) {
        let params: URLSearchParams = new URLSearchParams();
        params.set('limit', limit);
        params.set('offset', offset);
        return this.httpProvider.httpGetWithAuth("/events/" + id + '/comments', params);
    }

    comment(id, param) {
        let body = JSON.stringify(param);
        return this.httpProvider.httpPostWithAuth("/events/" + id + "/comment", body);
    }

    share(id, param) {
        let body = JSON.stringify(param);
        return this.httpProvider.httpPostWithAuth("/events/" + id + "/share", body);
    }

    // 删除动态
    deleteEvent(event) {
        return this.httpProvider.httpDeleteWithAuth("/event/" + event.id);
    }

    // 更新动态
    updateEvent(event, params) {
        return this.httpProvider.httpPatchWithAuth("/event/" + event.id, params);
    }


    /**
     * 举报
     *
     * @param param
     * @returns {Promise<Promise<Response>>}
     */
    report(id,body) {
        return this.httpProvider.httpPostWithAuth("/events/"+id+"/report", body);
    }

}
