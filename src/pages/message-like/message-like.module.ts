import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {MessageLikePage} from './message-like';
import {MyFollowButtonComponentModule} from '../../components/my-follow-button/my-follow-button.module'

@NgModule({
    declarations: [
        MessageLikePage,
    ],
    imports: [
        IonicPageModule.forChild(MessageLikePage),
        MyFollowButtonComponentModule
    ],
})
export class MessageLikePageModule {
}
