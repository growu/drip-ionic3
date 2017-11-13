import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {HttpProvider} from "../http/http";

@Injectable()
export class CommentProvider {

    constructor(public http: Http, public httpProvider: HttpProvider) {
    }

    reply(id, content) {
        return this.httpProvider.httpPostWithAuth("/comment/" + id + "/reply", {'content': content});
    }

    like(id) {
        return this.httpProvider.httpPutWithAuth("/comment/" + id + "/like", null);
    }

    unLike(id) {
        return this.httpProvider.httpDeleteWithAuth("/comment/" + id + "/like");
    }

}
