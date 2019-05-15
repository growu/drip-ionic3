import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {GoalDetailEventPage} from './goal-detail-event';
import {MyEventComponentModule} from '../../components/my-event/my-event.module';
import {MomentModule} from 'angular2-moment';
import {MyLoaderComponentModule} from '../../components/my-loader/my-loader.module';

@NgModule({
    declarations: [
        GoalDetailEventPage,
    ],
    imports: [
        IonicPageModule.forChild(GoalDetailEventPage),
        MomentModule,
        MyEventComponentModule,
        MyLoaderComponentModule
    ],
})
export class GoalDetailEventPageModule {
}
