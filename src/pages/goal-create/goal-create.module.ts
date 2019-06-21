import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {GoalCreatePage} from './goal-create';
import {DpWeekSelectorComponentModule} from '../../components/dp-week-selector/dp-week-selector.module';
import {PipesModule} from '../../pipes/pipes.module'

@NgModule({
    declarations: [
        GoalCreatePage,
    ],
    imports: [
        IonicPageModule.forChild(GoalCreatePage),
        DpWeekSelectorComponentModule,
        PipesModule
    ],
    exports: [
        GoalCreatePage
    ],
    providers: []
})
export class GoalCreatePageModule {
}
