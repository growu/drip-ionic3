import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {GoalCheckinPage} from './goal-checkin';
import {Camera} from '@ionic-native/camera';
import {ImagePickerProvider, FileProvider, FileTransferProvider, CropProvider} from '../../providers/AppProvider';
import {ToolProvider} from "../../providers/tool/tool";
import {IonicImageViewerModule} from "ionic-img-viewer";
import {VgStreamingModule} from 'videogular2/streaming';
import {VgCoreModule} from 'videogular2/core';
import {VgControlsModule} from 'videogular2/controls';
import {VgOverlayPlayModule} from 'videogular2/overlay-play';
import {VgBufferingModule} from 'videogular2/buffering';
// import { VgAPI } from 'videogular2/core';

@NgModule({
    declarations: [
        GoalCheckinPage
    ],
    imports: [
        IonicPageModule.forChild(GoalCheckinPage),
        IonicImageViewerModule,
        VgCoreModule,
        VgControlsModule,
        VgOverlayPlayModule,
        VgBufferingModule,
        VgStreamingModule
    ],
    providers: [
        ImagePickerProvider,
        FileProvider,
        FileTransferProvider,
        Camera,
        CropProvider,
        ToolProvider,
        // VgAPI
    ]
})
export class GoalCheckinPageModule {
}
