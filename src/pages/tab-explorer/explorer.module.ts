/**
 * Created by Jason.z on 2017/7/4.
 */

import { NgModule } from '@angular/core';
import { TabExplorerPage } from './explorer';
import { IonicPageModule } from 'ionic-angular';

@NgModule({
    declarations: [TabExplorerPage],
    imports: [IonicPageModule.forChild(TabExplorerPage)],
})
export class ExplorerPageModule { }
