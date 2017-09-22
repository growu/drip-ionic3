import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GoalCheckinPage } from './goal-checkin';
import { ImagePicker } from '@ionic-native/image-picker';
import { ImagePickerMock } from '@ionic-native-mocks/image-picker';
import { File } from '@ionic-native/file';
import { FileMock } from '@ionic-native-mocks/file';
import { FileTransfer } from '@ionic-native/file-transfer';
import { FileTransferMock } from '@ionic-native-mocks/file-transfer';
import { Camera } from '@ionic-native/camera';

@NgModule({
  declarations: [
    GoalCheckinPage,
  ],
  imports: [
    IonicPageModule.forChild(GoalCheckinPage),
  ],
  providers: [
    { provide: ImagePicker, useClass: ImagePickerMock },
    { provide: File, useClass: FileMock },
    { provide: FileTransfer, useClass: FileTransferMock },
    { provide: Camera },

  ]
})
export class GoalCheckinPageModule {}
