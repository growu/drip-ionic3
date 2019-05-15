import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {AboutPage} from './about';
import {InAppBrowser} from '@ionic-native/in-app-browser';
import {ToolProvider} from "../../providers/tool/tool";
import {ImagePickerProvider,FileProvider,FileTransferProvider,CropProvider} from '../../providers/AppProvider';
import {Camera} from '@ionic-native/camera';

@NgModule({
    declarations: [
        AboutPage,
    ],
    imports: [
        IonicPageModule.forChild(AboutPage),
    ],
    providers: [
        InAppBrowser,
        ToolProvider,
        ImagePickerProvider,
        FileProvider,
        FileTransferProvider,
        CropProvider,
        Camera,
    ]
})
export class AboutPageModule {
}
