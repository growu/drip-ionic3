import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {GoalCheckinPage} from './goal-checkin';
import {Camera} from '@ionic-native/camera';
import {AppProvider} from '../../providers/AppProvider';
import {ImagePickerProvider} from '../../providers/AppProvider';
import {FileProvider} from '../../providers/AppProvider';
import {FileTransferProvider} from '../../providers/AppProvider';
import {ImagePicker} from "@ionic-native/image-picker";
import {FileTransfer} from "@ionic-native/file-transfer";

@NgModule({
    declarations: [
        GoalCheckinPage,
    ],
    imports: [
        IonicPageModule.forChild(GoalCheckinPage),
    ],
    providers: [
        ImagePickerProvider,
        FileProvider,
        FileTransferProvider,
        // {provide: ImagePicker, useFactory: ImagePickerFactory},
        // {provide: File, useFactory: FileFactory},
        // {provide: FileTransfer, useFactory: FileTransferFactory},
        // AppProvider.getImagePickerProvider(),
        // AppProvider.getFileProvider(),
        // AppProvider.getFileTransferProvider(),
        Camera
    ]
})
export class GoalCheckinPageModule {
}
