import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {GoalCreatePage} from './goal-create';
import {MyWeekSelectorComponentModule} from '../../components/my-week-selector/my-week-selector.module';
import {PipesModule} from '../../pipes/pipes.module'

@NgModule({
    declarations: [
        GoalCreatePage,
    ],
    imports: [
        IonicPageModule.forChild(GoalCreatePage),
        MyWeekSelectorComponentModule,
        PipesModule
    ],
    exports: [
        GoalCreatePage
    ],
    providers: []
})
export class GoalCreatePageModule {
}
