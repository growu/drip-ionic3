
import { NgModule } from '@angular/core';
import { ExplorerPage } from './explorer';
import { IonicPageModule } from 'ionic-angular';
import { SuperTabsModule } from 'ionic2-super-tabs';
import { SuperTabsController } from "ionic2-super-tabs/dist/index";

@NgModule({
    declarations: [ExplorerPage],
    imports: [
        IonicPageModule.forChild(ExplorerPage),
        SuperTabsModule
    ],
    providers:[
        SuperTabsController
    ]
})
export class ExplorerPageModule { }
