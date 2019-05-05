import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {GoalHomePage} from './goal-home';
import {SuperTabsModule} from 'ionic2-super-tabs';
import {SuperTabsController} from "ionic2-super-tabs/dist/index";
import {MyEventComponentModule} from '../../components/my-event/my-event.module';

@NgModule({
    declarations: [
        GoalHomePage,
    ],
    imports: [
        IonicPageModule.forChild(GoalHomePage),
        SuperTabsModule,
        MyEventComponentModule
    ],
    providers: [
        SuperTabsController
    ]
})
export class GoalHomePageModule {
}
