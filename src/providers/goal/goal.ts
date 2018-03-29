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

    createGoal(goal) {
        return this.httpProivder.httpPostWithAuth("/goal/create", goal);
    }

    updateGoal(id, param) {
        let body = JSON.stringify(param);
        return this.httpProivder.httpPatchWithAuth("/user/goal/" + id, body);
    }

    // 制定目标
    doFollowGoal(id) {
        return this.httpProivder.httpPutWithAuth("/goal/"+id+"/follow", null);
    }

    // 获取目标信息
    getGoalInfo(id) {
        return this.httpProivder.httpGetWithAuth("/goal/" + id,null);
    }

    // 获取目标动态
    getGoalEvnets(id,page,per_page) {
        let params: URLSearchParams = new URLSearchParams();
        params.set('page', page);
        params.set('per_page', per_page);
        return this.httpProivder.httpGetWithAuth("/goal/" + id + "/events", params);
    }

    // 获取目标排行
    getGoalTop(id,page,per_page){
        let params: URLSearchParams = new URLSearchParams();
        params.set('page', page);
        params.set('per_page', per_page);
        return this.httpProivder.httpGetWithAuth("/goal/" + id + "/top",params);
    }
}
