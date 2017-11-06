import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { HttpProvider } from '../http/http';
import { URLSearchParams } from '@angular/http';

@Injectable()
export class GoalProvider {

  constructor(public http: Http,
              public httpProivder: HttpProvider) {
  }

  createGoal(goal){
    return this.httpProivder.httpPostWithAuth("/goal/create",goal);
  }

    updateGoal(id,param){
        let body = JSON.stringify(param);
        return this.httpProivder.httpPatchWithAuth("/user/goal/"+ id, body);
    }

}
