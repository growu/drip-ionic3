import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { HttpProvider } from '../http/http';
import { URLSearchParams } from '@angular/http';

/*
  Generated class for the GoalProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GoalProvider {

  constructor(public http: Http,
              public httpProivder: HttpProvider) {
  }

  createGoal(goal){
    return this.httpProivder.httpPostWithAuth("/goal/create",goal);
  }

}
