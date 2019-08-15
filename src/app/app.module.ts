import {BrowserModule} from '@angular/platform-browser';
import {HttpModule} from '@angular/http';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {SplashScreen} from '@ionic-native/splash-screen';
import {Device} from '@ionic-native/device';
import {StatusBar} from '@ionic-native/status-bar';
import {Keyboard} from '@ionic-native/keyboard';
import {MyApp} from './app.component';
import {IonicStorageModule} from '@ionic/storage';
import {Deeplinks} from '@ionic-native/deeplinks';
import {JPush} from '@jiguang-ionic/jpush';
import {NativeStorage} from '@ionic-native/native-storage';
import {NativeAudio} from '@ionic-native/native-audio';
import {BackgroundMode} from '@ionic-native/background-mode';
import {Vibration} from '@ionic-native/vibration';
import {LocalNotifications} from '@ionic-native/local-notifications';
import {PhotoLibrary} from '@ionic-native/photo-library';
import {Media} from '@ionic-native/media';
import {MediaCapture} from '@ionic-native/media-capture';
import {StreamingMedia} from '@ionic-native/streaming-media';
import {NativePageTransitions} from '@ionic-native/native-page-transitions';
import {OpenNativeSettings} from '@ionic-native/open-native-settings';
import { VideoEditor } from '@ionic-native/video-editor';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {DpHammerConfig} from '../components/DpHammerConfig'
import {HAMMER_GESTURE_CONFIG} from '@angular/platform-browser';
import {UserProvider} from '../providers/user/user';
import {HttpProvider} from '../providers/http/http';
import {GoalProvider} from '../providers/goal/goal';
import {EventProvider} from '../providers/event/event';
import {CommentProvider} from '../providers/comment/comment';
import {ToastProvider} from '../providers/toast/toast';
import {LoadingProvider} from '../providers/loading/loading';
import {IonicImageViewerModule} from 'ionic-img-viewer';
import {DpShareModule} from '../components/dp-share/dp-share.module';
import {TopProvider} from '../providers/top/top';
import {TopicProvider} from '../providers/topic/topic';
import {MallProvider} from '../providers/mall/mall';
import {VersionProvider} from '../providers/version/version';
import {JpushProvider} from '../providers/jpush/jpush';
import {PostProvider} from '../providers/post/post';
import { VerificationProvider } from '../providers/verification/verification';
import { PayProvider } from '../providers/pay/pay';

@NgModule({
    declarations: [
        MyApp,
    ],
    imports: [
        BrowserModule,
        HttpModule,
        IonicStorageModule.forRoot({
            name: 'drip_db',
            driverOrder: ['sqlite', 'websql', 'indexdb', 'localstorage']
        }),
        IonicModule.forRoot(MyApp, {
            backButtonText: '',
            tabsHideOnSubPages: true,
            scrollAssist: false,
            autoFocusAssist: false,
            monthNames: ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二'],
            monthShortNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
        }),
        IonicImageViewerModule,
        DpShareModule,
        BrowserAnimationsModule,
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
    ],
    providers: [
        StatusBar,
        SplashScreen,
        Device,
        Keyboard,
        Deeplinks,
        JPush,
        NativeStorage,
        NativeAudio,
        PhotoLibrary,
        BackgroundMode,
        Vibration,
        Media,
        MediaCapture,
        StreamingMedia,
        LocalNotifications,
        NativePageTransitions,
        OpenNativeSettings,
        VideoEditor,
        {provide: ErrorHandler, useClass: IonicErrorHandler},
        {
            provide: HAMMER_GESTURE_CONFIG,
            useClass: DpHammerConfig
        },
        UserProvider,
        HttpProvider,
        GoalProvider,
        EventProvider,
        CommentProvider,
        ToastProvider,
        LoadingProvider,
        TopProvider,
        TopicProvider,
        MallProvider,
        VersionProvider,
        JpushProvider,
        PostProvider,
    VerificationProvider,
    PayProvider,
    ]
})
export class AppModule {
}
