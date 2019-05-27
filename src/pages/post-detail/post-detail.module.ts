import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {PostDetailPage} from './post-detail';
import {MomentModule} from 'angular2-moment';
import {KeyboardProvider} from "../../providers/AppProvider";
import {InAppBrowser} from '@ionic-native/in-app-browser';
import {DpCommentComponentModule} from '../../components/dp-comment/dp-comment.module';
import {DpCommentToolbarComponentModule} from "../../components/dp-comment-toolbar/dp-comment-toolbar.module";

@NgModule({
    declarations: [
        PostDetailPage,
    ],
    imports: [
        IonicPageModule.forChild(PostDetailPage),
        MomentModule,
        DpCommentComponentModule,
        DpCommentToolbarComponentModule
    ],
    providers: [
        KeyboardProvider,
        InAppBrowser
    ]
})
export class PostDetailPageModule {
}
