import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {HttpProvider} from '../http/http';
import {URLSearchParams} from '@angular/http';

@Injectable()
export class GoalProvider {

    constructor(public http: Http,
                public httpProivder: HttpProvider) {
    }

    /**
     * 创建目标
     *
     * @param goal
     * @returns {Promise<any>}
     */
    createGoal(goal) {
        return this.httpProivder.httpPostWithAuth("/goals", goal);
    }

    /**
     * 更新目标
     *
     * @param id
     * @param param
     * @returns {Promise<Promise<Response>>}
     */
    updateGoal(id, param) {
        let body = JSON.stringify(param);
        return this.httpProivder.httpPatchWithAuth("/user/goals/" + id, body);
    }

    /**
     * 制定目标
     *
     * @param id
     * @returns {Promise<Promise<Response>>}
     */
    doFormulateGoal(id) {
        return this.httpProivder.httpPostWithAuth("/user/goals/" + id , null);
    }

    /**
     * 获取目标
     * @param id
     * @returns {Promise<Response>}
     */
    getGoalInfo(id) {
        return this.httpProivder.httpGetWithAuth("/goals/" + id, null);
    }

    /**
     * 获取目标动态
     * @param id
     * @param page
     * @param per_page
     * @returns {Promise<Response>}
     */
    getGoalEvnets(id, page, per_page) {
        let params: URLSearchParams = new URLSearchParams();
        params.set('page', page);
        params.set('per_page', per_page);
        return this.httpProivder.httpGetWithAuth("/goals/" + id + "/events", params);
    }

    getGoalMember(id, is_audit, page, per_page) {
        let params: URLSearchParams = new URLSearchParams();
        params.set('page', page);
        params.set('per_page', per_page);
        params.set('is_audit', is_audit);
        return this.httpProivder.httpGetWithAuth("/goal/" + id + "/member", params);
    }

    // 获取目标排行
    getGoalRanks(id, page, per_page) {
        let params: URLSearchParams = new URLSearchParams();
        params.set('page', page);
        params.set('per_page', per_page);
        return this.httpProivder.httpGetWithAuth("/goals/" + id + "/ranks", params);
    }

    doAudit(id, param) {
        let body = JSON.stringify(param);
        return this.httpProivder.httpPatchWithAuth("/goal/" + id + "/audit", body);
    }

    doSearch(name) {
        let params: URLSearchParams = new URLSearchParams();
        params.set('name', name);
        return this.httpProivder.httpGetWithAuth("/goal/search", params);
    }

    /**
     * 获取热门目标
     * @returns {Promise<Response>}
     */
    getHotGoals() {
        return this.httpProivder.httpGetWithAuth("/goals/hot", null);
    }
}
