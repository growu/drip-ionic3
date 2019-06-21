import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {UserHomeEventsPage} from './user-home-events';
import {DpEventComponentModule} from '../../components/dp-event/dp-event.module';
import { DpLoaderComponentModule } from '../../components/dp-loader/dp-loader.module';

@NgModule({
    declarations: [
        UserHomeEventsPage,
    ],
    imports: [
        IonicPageModule.forChild(UserHomeEventsPage),
        DpEventComponentModule,
        DpLoaderComponentModule
    ],
})
export class UserHomeEventsPageModule {
}
