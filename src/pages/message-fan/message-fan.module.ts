import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {MessageFanPage} from './message-fan';
import {MyFollowButtonComponentModule} from '../../components/my-follow-button/my-follow-button.module'
import {MyLoaderComponentModule} from '../../components/my-loader/my-loader.module';

@NgModule({
    declarations: [
        MessageFanPage,
    ],
    imports: [
        IonicPageModule.forChild(MessageFanPage),
        MyFollowButtonComponentModule,
        MyLoaderComponentModule
    ],
})
export class MessageFanPageModule {
}
