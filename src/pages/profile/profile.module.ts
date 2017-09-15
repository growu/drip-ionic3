import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfilePage } from './profile';
import { ImagePicker } from '@ionic-native/image-picker';
import { ImagePickerMock } from '@ionic-native-mocks/image-picker';
import { MultiPickerModule } from 'ion-multi-picker';
import { File } from '@ionic-native/file';
import { FileMock } from '@ionic-native-mocks/file';
import { FileTransfer } from '@ionic-native/file-transfer';
import { FileTransferMock } from '@ionic-native-mocks/file-transfer';
import { Crop } from '@ionic-native/crop';
import { CropMock } from '@ionic-native-mocks/crop';


@NgModule({
  declarations: [
    ProfilePage,
  ],
  imports: [
    IonicPageModule.forChild(ProfilePage),
    MultiPickerModule
  ],
  providers: [
    { provide: ImagePicker, useClass: ImagePickerMock },
    { provide: File, useClass: FileMock },
    { provide: FileTransfer, useClass: FileTransferMock },
    { provide: Crop, useClass: CropMock }
  ]
})
export class ProfilePageModule {}
