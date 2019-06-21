import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {GoalDetailEventPage} from './goal-detail-event';
import {DpEventComponentModule} from '../../components/dp-event/dp-event.module';
import {MomentModule} from 'angular2-moment';
import {DpLoaderComponentModule} from '../../components/dp-loader/dp-loader.module';

@NgModule({
    declarations: [
        GoalDetailEventPage,
    ],
    imports: [
        IonicPageModule.forChild(GoalDetailEventPage),
        MomentModule,
        DpEventComponentModule,
        DpLoaderComponentModule
    ],
})
export class GoalDetailEventPageModule {
}
