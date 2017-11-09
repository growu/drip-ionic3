import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FeedbackPage } from './feedback';
import {ImagePickerProvider,FileProvider,FileTransferProvider,CropProvider} from "../../providers/AppProvider";
import {ToolProvider} from "../../providers/tool/tool";
import {Camera} from '@ionic-native/camera';
import {IonicImageViewerModule} from "ionic-img-viewer";

@NgModule({
  declarations: [
    FeedbackPage,
  ],
  imports: [
    IonicPageModule.forChild(FeedbackPage),
      IonicImageViewerModule

  ],
    providers:[
        ImagePickerProvider,
        FileProvider,
        FileTransferProvider,
        CropProvider,
        Camera,
        ToolProvider
    ]
})
export class FeedbackPageModule {}
