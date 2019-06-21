import {NgModule} from '@angular/core';
import {TopPage} from './top';
import {IonicPageModule} from 'ionic-angular';
import {DpLoaderComponentModule} from '../../components/dp-loader/dp-loader.module';

@NgModule({
    declarations: [TopPage],
    imports: [IonicPageModule.forChild(TopPage), DpLoaderComponentModule],
})
export class TopPageModule {
}