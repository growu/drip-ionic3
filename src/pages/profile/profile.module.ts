import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {ProfilePage} from './profile';
import {MultiPickerModule} from 'ion-multi-picker';
import {ImagePickerProvider} from '../../providers/AppProvider';
import {FileProvider} from '../../providers/AppProvider';
import {FileTransferProvider} from '../../providers/AppProvider';
import {CropProvider} from '../../providers/AppProvider';

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
        CropProvider
        // {provide: ImagePicker, useFactory: ImagePickerFactory},
        // {provide: File, useFactory: FileFactory},
        // {provide: FileTransfer, useFactory: FileTransferFactory},
        // {provide: Crop, useFactory: CropFactory},

//        AppProvider.getImagePickerProvider(),
//        AppProvider.getFileProvider(),
//        AppProvider.getFileTransferProvider(),
//        AppProvider.getCropProvider(),
    ]
})
export class ProfilePageModule {
}
