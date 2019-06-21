import {Component, Input} from '@angular/core';

@Component({
    selector: 'dp-user-avatar',
    templateUrl: 'dp-user-avatar.html'
})
export class DpUserAvatarComponent {

    @Input() user: any = {};

    // public user:any = {
    //   verified_type:0,
    //   avatar_url:''
    // };

    constructor() {

    }

    // @Input()
    // set user(value: any) {
    //     this._user = value;
    // }

}
