/**
 * Created by Jason.z on 2017/7/4.
 */


import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TabsPage } from "./tabs";

@NgModule({
    declarations: [
        TabsPage,
    ],
    entryComponents: [
        TabsPage,
    ],
    imports: [
        IonicPageModule.forChild(TabsPage)
    ],
    exports: [
        IonicPageModule
    ]
})
export class TabsPageModule {}