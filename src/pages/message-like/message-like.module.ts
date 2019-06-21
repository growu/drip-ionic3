import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {MessageLikePage} from './message-like';
import {DpFollowButtonComponentModule} from '../../components/dp-follow-button/dp-follow-button.module'

@NgModule({
    declarations: [
        MessageLikePage,
    ],
    imports: [
        IonicPageModule.forChild(MessageLikePage),
        DpFollowButtonComponentModule
    ],
})
export class MessageLikePageModule {
}
