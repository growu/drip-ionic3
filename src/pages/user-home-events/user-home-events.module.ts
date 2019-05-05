import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {UserHomeEventsPage} from './user-home-events';
import {MyEventComponentModule} from '../../components/my-event/my-event.module';
import { MyLoaderComponentModule } from '../../components/my-loader/my-loader.module';

@NgModule({
    declarations: [
        UserHomeEventsPage,
    ],
    imports: [
        IonicPageModule.forChild(UserHomeEventsPage),
        MyEventComponentModule,
        MyLoaderComponentModule
    ],
})
export class UserHomeEventsPageModule {
}
