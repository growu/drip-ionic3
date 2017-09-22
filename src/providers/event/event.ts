import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { HttpProvider } from '../http/http';

@Injectable()
export class EventProvider {

  constructor(public http: Http,
              public httpProivder: HttpProvider) {
  }

  like(id){
    return this.httpProivder.httpPutWithAuth("/event/"+id+"/like",null);
  }

  unLike(id){
    return this.httpProivder.httpDeleteWithAuth("/event/"+id+"/like");
  }


}
