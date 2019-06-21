import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {GoalHomeEventsPage} from './goal-home-events';
import {DpEventComponentModule} from '../../components/dp-event/dp-event.module';

@NgModule({
    declarations: [
        GoalHomeEventsPage,
    ],
    imports: [
        IonicPageModule.forChild(GoalHomeEventsPage),
        DpEventComponentModule
    ],
})
export class GoalHomeEventsPageModule {
}
