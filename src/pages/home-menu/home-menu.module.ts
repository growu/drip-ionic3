import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {HomeMenuPage} from './home-menu';
import { CheckPro } from '../../directives/check-pro.directive';

@NgModule({
    declarations: [
        HomeMenuPage,
        CheckPro
    ],
    imports: [
        IonicPageModule.forChild(HomeMenuPage),
    ],
    providers:[
        CheckPro
    ]
})
export class HomeMenuPageModule {
}
