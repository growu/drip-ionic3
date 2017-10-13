import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {GoalCheckinPage} from './goal-checkin';
import {Camera} from '@ionic-native/camera';
import {AppProvider} from '../../providers/AppProvider';

@NgModule({
    declarations: [
        GoalCheckinPage,
    ],
    imports: [
        IonicPageModule.forChild(GoalCheckinPage),
    ],
    providers: [
        AppProvider.getImagePickerProvider(),
        AppProvider.getFileProvider(),
        AppProvider.getFileTransferProvider(),
        Camera
    ]
})
export class GoalCheckinPageModule {
}
