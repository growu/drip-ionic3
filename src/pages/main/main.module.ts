/**
 * Created by Jason.z on 2017/7/4.
 */


import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MainPage } from "./main";

@NgModule({
    declarations: [
        MainPage,
    ],
    entryComponents: [
        MainPage,
    ],
    imports: [
        IonicPageModule.forChild(MainPage)
    ],
    exports: [
        IonicPageModule
    ]
})
export class MainPageModule {}