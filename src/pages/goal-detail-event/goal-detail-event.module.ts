import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {GoalDetailEventPage} from './goal-detail-event';
import {MyEventComponentModule} from '../../components/my-event/my-event.module';
import {MomentModule} from 'angular2-moment';


@NgModule({
    declarations: [
        GoalDetailEventPage,
    ],
    imports: [
        IonicPageModule.forChild(GoalDetailEventPage),
        MomentModule,
        MyEventComponentModule
    ],
})
export class GoalDetailEventPageModule {
}
