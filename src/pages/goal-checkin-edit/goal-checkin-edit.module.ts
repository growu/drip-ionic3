import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GoalCheckinEditPage } from './goal-checkin-edit';
import {ImagePickerProvider, FileProvider, FileTransferProvider, CropProvider} from '../../providers/AppProvider';
import {IonicImageViewerModule} from "ionic-img-viewer";
import {ToolProvider} from "../../providers/tool/tool";
import {Camera} from '@ionic-native/camera';

@NgModule({
  declarations: [
    GoalCheckinEditPage,
  ],
  imports: [
    IonicPageModule.forChild(GoalCheckinEditPage),
      IonicImageViewerModule

  ],
  providers: [
      ImagePickerProvider,
      FileProvider,
      FileTransferProvider,
      Camera,
      CropProvider,
      ToolProvider
  ]
})
export class GoalCheckinEditPageModule {}
