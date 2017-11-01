import {Injectable} from '@angular/core';
import {MyShare} from './my-share';
import {App} from "ionic-angular";
import {MyShareOptions} from "./my-share.options";

@Injectable()
export class MyShareController {

    constructor(private _app: App) {
    }

    create(opts: MyShareOptions = {}):MyShare {
        return new MyShare(this._app,opts);
    };

}