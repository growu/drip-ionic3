import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {GoalDetailChartPage} from './goal-detail-chart';
import {ChartsModule} from 'ng2-charts/ng2-charts';


@NgModule({
    declarations: [
        GoalDetailChartPage,
    ],
    imports: [
        IonicPageModule.forChild(GoalDetailChartPage),
        ChartsModule
    ],
})
export class GoalDetailChartPageModule {
}
