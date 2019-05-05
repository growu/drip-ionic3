import { Injectable } from '@angular/core';
import { VersionModel } from '../../models/version.model'

declare var chcp:any;

@Injectable()
export class VersionProvider {

    public version: VersionModel;

    constructor() {

    }

  init() {
    if(typeof chcp != "undefined") {
        chcp.getVersionInfo((err, data) => {
            console.log(data);
        });
    }
  }

  getVersion() {
    return this.version;
  }

}
