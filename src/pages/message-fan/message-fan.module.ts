import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {MessageFanPage} from './message-fan';
import {DpFollowButtonComponentModule} from '../../components/dp-follow-button/dp-follow-button.module'
import {DpLoaderComponentModule} from '../../components/dp-loader/dp-loader.module';

@NgModule({
    declarations: [
        MessageFanPage,
    ],
    imports: [
        IonicPageModule.forChild(MessageFanPage),
        DpFollowButtonComponentModule,
        DpLoaderComponentModule
    ],
})
export class MessageFanPageModule {
}
