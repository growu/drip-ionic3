/**
 * Created by Jason.z on 2017/7/4.
 */

import { NgModule } from '@angular/core';
import { ExplorerPage } from './explorer';
import { IonicPageModule } from 'ionic-angular';

@NgModule({
    declarations: [ExplorerPage],
    imports: [IonicPageModule.forChild(ExplorerPage)],
})
export class ExplorerPageModule { }
