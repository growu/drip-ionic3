import {Component, Input} from '@angular/core';

@Component({
    selector: 'my-user-avatar',
    templateUrl: 'my-user-avatar.html'
})
export class MyUserAvatarComponent {

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
