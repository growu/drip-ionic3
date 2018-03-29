import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {GoalHomeEventsPage} from './goal-home-events';
import {MyEventComponentModule} from '../../components/my-event/my-event.module';

@NgModule({
    declarations: [
        GoalHomeEventsPage,
    ],
    imports: [
        IonicPageModule.forChild(GoalHomeEventsPage),
        MyEventComponentModule
    ],
})
export class GoalHomeEventsPageModule {
}
