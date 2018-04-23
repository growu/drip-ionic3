import {Component, ViewChild} from '@angular/core';
import {Nav, Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {UserProvider} from '../providers/user/user';
import {Storage} from '@ionic/storage';
import {Keyboard} from '@ionic-native/keyboard';
import {Deeplinks} from '@ionic-native/deeplinks';
import {JPush} from '@jiguang-ionic/jpush';
import {NativeAudio} from '@ionic-native/native-audio';
import { BackgroundMode } from '@ionic-native/background-mode';
import { Vibration } from '@ionic-native/vibration';

declare var chcp;

@Component({
    templateUrl: 'app.html'
})

export class MyApp {
    rootPage: any = 'welcome';
    @ViewChild(Nav) nav: Nav;

    constructor(platform: Platform,
                statusBar: StatusBar,
                splashScreen: SplashScreen,
                jpush: JPush,
                private deeplinks: Deeplinks,
                storage: Storage,
                private backgroundMode: BackgroundMode,
                private keyboard: Keyboard,
                private nativeAudio: NativeAudio,
                private vibration: Vibration,
                public userProvider: UserProvider) {
        platform.ready().then(() => {
            statusBar.styleDefault();
            splashScreen.hide();
            this.keyboard.disableScroll(true);
            this.backgroundMode.enable();
            this.backgroundMode.overrideBackButton();

            if (platform.is('cordova')) {

                jpush.init();
                jpush.setDebugMode(true);
                jpush.setApplicationIconBadgeNumber(0);

                document.addEventListener("jpush.receiveNotification", (event: any) => {
                    console.log("接收到通知");
                    console.log(event);
                    this.playAudio(event);
                }, false);

                document.addEventListener("jpush.openNotification", (event: any) => {
                    console.log("点击通知");
                    console.log(event);
                    this.goPage(event);
                }, false);

                document.addEventListener("jpush.backgroundNotification", (event: any) => {
                    console.log("后台通知");
                    console.log(event);
                    this.playAudio(event);
                }, false);

                this.subscribeRoutes();

                // var appUpdate = {
                //     // Application Constructor
                //     initialize: function () {
                //         this.bindEvents();
                //     },
                //     // Bind any events that are required.
                //     // Usually you should subscribe on 'deviceready' event to know, when you can start calling cordova modules
                //     bindEvents: function () {
                //         document.addEventListener('deviceready', this.onDeviceReady, false);
                //         document.addEventListener('chcp_updateLoadFailed', this.onUpdateLoadError, false);
                //     },
                //     // deviceready Event Handler
                //     onDeviceReady: function () {
                //         chcp.isUpdateAvailableForInstallation(function (error, data) {
                //             if (error) {
                //                 console.log('未发现安装资源包，开始向服务器请求..');
                //                 chcp.fetchUpdate(appUpdate.fetchUpdateCallback);
                //                 return;
                //             }
                //             // update is in cache and can be installed - install it
                //             console.log('当前版本: ' + data.currentVersion);
                //             console.log('最新版本: ' + data.readyToInstallVersion);
                //             chcp.installUpdate(appUpdate.installationCallback);
                //         });
                //     },
                //     fetchUpdateCallback: function (error, data) {
                //         if (error) {
                //             console.log('加载更新失败: ' + error.code);
                //             console.log(error.description);
                //             return;
                //         }
                //         console.log('更新已加载');
                //     },
                //
                //     installationCallback: function (error) {
                //         if (error) {
                //             console.log('安装更新失败: ' + error.code);
                //             console.log(error.description);
                //         } else {
                //             console.log('更新已安装!');
                //         }
                //     },
                //     onUpdateLoadError: function (eventData) {
                //
                //         var error = eventData.detail.error;
                //
                //         console.log("更新失败：" + error.code);
                //         console.log("更新失败：" + error.description);
                //
                //         // 当检测出内核版本过小
                //         if (error && error.code == chcp.error.APPLICATION_BUILD_VERSION_TOO_LOW) {
                //             var dialogMessage = '发现新版本，请下载更新';
                //             chcp.requestApplicationUpdate(dialogMessage, this.userWentToStoreCallback, this.userDeclinedRedirectCallback);
                //         }
                //     },
                //     userWentToStoreCallback: function () {
                //         // user went to the store from the dialog
                //     },
                //     userDeclinedRedirectCallback: function () {
                //         // User didn't want to leave the app.
                //         // Maybe he will update later.
                //     }
                // };
                // appUpdate.initialize();
            }
        });
    }

    goPage(event) {
        var page_url;
        var page_params;

        page_url = event["extras"]["page_url"];
        page_params = event["extras"]["page_params"];

        console.log(page_url);
        console.log(page_params);

        if (page_url) {
            this.nav.push(page_url,  JSON.parse(page_params));
        }
    }

    playAudio(event) {
        let audio_name = event["extras"]["audio_name"];

        console.log(audio_name);

        if(!audio_name) {
            audio_name = 'drip.mp3';
        }

        this.nativeAudio.preloadSimple('push-sound', 'assets/audio/'+audio_name).then(()=>{
            console.log("preload audio successful");
        }, (err)=>{
            console.log("preload audio err");
            console.log(err);
        });

        this.backgroundMode.on("activate").subscribe(()=>{
            this.nativeAudio.play('push-sound', () => console.log('play audio success'));
        });

        this.nativeAudio.play('push-sound', () => console.log('play audio success'));
        this.vibration.vibrate(2000);

    }

    subscribeRoutes() {
        this.deeplinks.routeWithNavController(this.nav, {
            '/about': 'about',
            '/goal/:goalId': 'goal-home',
            '/event/:eventId': 'event-detail'
        }).subscribe((match) => {
            console.log(JSON.stringify(match));
            this.nav.push(match.$route, match.$args);
            return true;
        }, (nomatch) => {
            console.error('Got a deeplink that didn\'t match', JSON.stringify(nomatch));
            return true;
        });
    }
}

