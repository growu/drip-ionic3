/**
 * Created by Jason.z on 2017/7/4.
 */

import { NgModule } from '@angular/core';
import { TabTopPage } from './top';
import { IonicPageModule } from 'ionic-angular';

@NgModule({
    declarations: [TabTopPage],
    imports: [IonicPageModule.forChild(TabTopPage)],
})
export class TopPageModule { }