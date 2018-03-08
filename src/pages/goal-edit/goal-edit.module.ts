import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {GoalEditPage} from './goal-edit';
import {MyWeekSelectorComponentModule} from '../../components/my-week-selector/my-week-selector.module';
import {TooltipsModule} from 'ionic-tooltips';

@NgModule({
    declarations: [
        GoalEditPage,
    ],
    imports: [
        IonicPageModule.forChild(GoalEditPage),
        MyWeekSelectorComponentModule,
        TooltipsModule
    ],
})
export class GoalEditPageModule {
}
