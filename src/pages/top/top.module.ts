import {NgModule} from '@angular/core';
import {TopPage} from './top';
import {IonicPageModule} from 'ionic-angular';
import {MyLoaderComponentModule} from '../../components/my-loader/my-loader.module';

@NgModule({
    declarations: [TopPage],
    imports: [IonicPageModule.forChild(TopPage), MyLoaderComponentModule],
})
export class TopPageModule {
}