/**
 * Created by Jason.z on 2017/7/4.
 */

import { NgModule } from '@angular/core';
import { TabHomePage } from './home';
import { IonicPageModule } from 'ionic-angular';

@NgModule({
    declarations: [TabHomePage],
    imports: [IonicPageModule.forChild(TabHomePage)],
})
export class HomePageModule { }