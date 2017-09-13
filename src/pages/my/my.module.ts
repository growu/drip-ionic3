/**
 * Created by Jason.z on 2017/7/4.
 */


import { NgModule } from '@angular/core';
import { MyPage } from './my';
import { IonicPageModule } from 'ionic-angular';

@NgModule({
    declarations: [MyPage],
    imports: [IonicPageModule.forChild(MyPage)],
})
export class MyPageModule { }