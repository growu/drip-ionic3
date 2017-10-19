import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {MessageFanPage} from './message-fan';
import {MyFollowButtonComponentModule} from '../../components/my-follow-button/my-follow-button.module'

@NgModule({
    declarations: [
        MessageFanPage,
    ],
    imports: [
        IonicPageModule.forChild(MessageFanPage),
        MyFollowButtonComponentModule
    ],
})
export class MessageFanPageModule {
}
