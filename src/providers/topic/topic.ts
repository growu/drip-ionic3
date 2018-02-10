import {Injectable} from '@angular/core';
import {HttpProvider} from "../http/http";
import {URLSearchParams} from '@angular/http';

@Injectable()
export class TopicProvider {

    constructor(private httpProvider: HttpProvider) {
    }

    getTopic(name) {
        return this.httpProvider.httpGetWithAuth("/topic/" + name, null);
    }

    getEvents(id, page, per_page) {
        let params: URLSearchParams = new URLSearchParams();
        params.set('page', page);
        params.set('per_page', per_page);
        return this.httpProvider.httpGetWithAuth("/topic/" + id + "/events", params);
    }

}
