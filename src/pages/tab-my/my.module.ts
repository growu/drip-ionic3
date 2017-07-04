/**
 * Created by Jason.z on 2017/7/4.
 */


import { NgModule } from '@angular/core';
import { TabMyPage } from './my';
import { IonicPageModule } from 'ionic-angular';

@NgModule({
    declarations: [TabMyPage],
    imports: [IonicPageModule.forChild(TabMyPage)],
})
export class MyPageModule { }