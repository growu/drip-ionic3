import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {GoalCreatePage} from './goal-create';
import {MyWeekSelectorComponentModule} from '../../components/my-week-selector/my-week-selector.module';

@NgModule({
    declarations: [
        GoalCreatePage,
    ],
    imports: [
        IonicPageModule.forChild(GoalCreatePage),
        MyWeekSelectorComponentModule
    ],
    exports: [
        GoalCreatePage
    ],
    providers: []
})
export class GoalCreatePageModule {
}
