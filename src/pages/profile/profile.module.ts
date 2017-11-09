import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {ProfilePage} from './profile';
import {MultiPickerModule} from 'ion-multi-picker';
import {ImagePickerProvider,FileProvider,FileTransferProvider,CropProvider} from '../../providers/AppProvider';
import {ToolProvider} from "../../providers/tool/tool";
import {Camera} from '@ionic-native/camera';

@NgModule({
    declarations: [
        ProfilePage,
    ],
    imports: [
        IonicPageModule.forChild(ProfilePage),
        MultiPickerModule
    ],
    providers: [
        ImagePickerProvider,
        FileProvider,
        FileTransferProvider,
        CropProvider,
        Camera,
        ToolProvider
    ]
})
export class ProfilePageModule {
}
