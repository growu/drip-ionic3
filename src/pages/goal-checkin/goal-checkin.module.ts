import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {GoalCheckinPage} from './goal-checkin';
import {Camera} from '@ionic-native/camera';
import {ImagePickerProvider, FileProvider, FileTransferProvider, CropProvider} from '../../providers/AppProvider';
import {ToolProvider} from "../../providers/tool/tool";

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
        Camera,
        CropProvider,
        ToolProvider
    ]
})
export class GoalCheckinPageModule {
}
