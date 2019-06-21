import {Injectable} from '@angular/core';
import {DpShare} from './dp-share';
import {App} from "ionic-angular";
import {DpShareOptions} from "./dp-share.options";

@Injectable()
export class DpShareController {

    constructor(private _app: App) {
    }

    create(opts: DpShareOptions = {}):DpShare {
        return new DpShare(this._app,opts);
    };

}