import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {GoalEditPage} from './goal-edit';
import {DpWeekSelectorComponentModule} from '../../components/dp-week-selector/dp-week-selector.module';
import {TooltipsModule} from 'ionic-tooltips';

@NgModule({
    declarations: [
        GoalEditPage,
    ],
    imports: [
        IonicPageModule.forChild(GoalEditPage),
        DpWeekSelectorComponentModule,
        TooltipsModule
    ],
})
export class GoalEditPageModule {
}
