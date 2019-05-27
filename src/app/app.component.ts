import {Component, ViewChild} from '@angular/core';
import {App, Nav, NavController, Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {UserProvider} from '../providers/user/user';
import {Storage} from '@ionic/storage';
import {Keyboard} from '@ionic-native/keyboard';
import {Deeplinks} from '@ionic-native/deeplinks';
import {JPush} from '@jiguang-ionic/jpush';
import {NativeAudio} from '@ionic-native/native-audio';
import {BackgroundMode} from '@ionic-native/background-mode';
import {Vibration} from '@ionic-native/vibration';
import {LocalNotifications} from '@ionic-native/local-notifications';
import {ToastProvider} from "../providers/toast/toast";
import {VersionProvider} from "../providers/version/version";
import {JpushProvider} from '../providers/jpush/jpush';

declare var chcp;

@Component({
    templateUrl: 'app.html'
})

export class MyApp {
    rootPage: any;
    @ViewChild(Nav) nav: Nav;

    constructor(private platform: Platform,
                statusBar: StatusBar,
                splashScreen: SplashScreen,
                jpush: JPush,
                private deeplinks: Deeplinks,
                storage: Storage,
                public appCtrl: App,
                private backgroundMode: BackgroundMode,
                private keyboard: Keyboard,
                private nativeAudio: NativeAudio,
                private vibration: Vibration,
                private toastProvider: ToastProvider,
                private versionProvider: VersionProvider,
                private jpushProvider: JpushProvider,
                private localNotifications: LocalNotifications,
                public userProvider: UserProvider) {
        platform.ready().then(() => {

            statusBar.styleDefault();
            splashScreen.hide();
            this.keyboard.disableScroll(true);
            this.backgroundMode.enable();

            // this.backgroundMode.overrideBackButton();

            if (platform.is('cordova')) {

                // 初始化数据
                this.versionProvider.init();
                this.jpushProvider.init();

                localNotifications.hasPermission().then(granted => {
                    if (granted) {
                        console.log("本地通知状态：开启");
                    } else {
                        console.log("本地通知状态：关闭");

                        // 请求权限
                        localNotifications.requestPermission().then(
                            granted => {

                            }).catch(
                            err => {

                            });
                    }
                }).catch(err => {

                });

                if (platform.is('android')) {
                    document.addEventListener("jpush.receiveMessage", (event: any) => {
                        console.log("接收到自定义消息");
                        console.log(event);
                        this.dealMessage(event.content);
                    }, false);
                }

                if (platform.is('ios')) {
                    document.addEventListener("jpush.receiveNotification", (event: any) => {
                        console.log("收到通知");
                        console.log(event);
                        this.goPage(event);
                    }, false);


                    document.addEventListener("jpush.openNotification", (event: any) => {
                        console.log("点击通知");
                        console.log(event);
                        this.goPage(event);
                    }, false);

                    document.addEventListener("jpush.backgroundNotification", (event: any) => {
                        console.log("收到后台通知");
                        console.log(event);
                        this.goPage(event);
                    }, false);
                }

                this.subscribeRoutes();

            }

            var lastTimeBackPress = 0;
            var timePeriodToExit = 2000;

            platform.registerBackButtonAction(() => {
                let activeNav: NavController = this.appCtrl.getActiveNavs()[0];

                if (activeNav.canGoBack()) {
                    activeNav.pop();
                } else {
                    if (new Date().getTime() - lastTimeBackPress < timePeriodToExit) {
                        this.platform.exitApp(); //Exit from app
                    } else {
                        this.toastProvider.show("再按一次退出程序", "warning")
                        lastTimeBackPress = new Date().getTime();
                    }
                }
            });

            storage.get('token').then(data => {
                if (!data) {
                    this.rootPage = 'login';
                } else {
                    this.rootPage = 'welcome';
                }
            })
        });
    }

    dealMessage(message) {
        message = JSON.parse(message);
        console.log(message);

        this.localNotifications.schedule({
            id: message.id,
            title: message.title,
            text: message.text,
            sound: 'file://assets/audio/' + message.sound,
            vibrate: message.vibrate,
            data: message.data
        });


        this.localNotifications.on('click').subscribe(notification => {

            if (notification.data) {
                let page_url = notification.data.page_url;
                let page_params = notification.data.page_params;

                console.log(page_url);
                console.log(page_params);

                if (page_url) {
                    this.nav.push(page_url, JSON.parse(page_params));
                }
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
            console.log(this.nav.getActive());

            if (this.nav.getActive()) {
                if (this.nav.getActive().id == page_url) {
                    return;
                }
            }

            this.nav.push(page_url, JSON.parse(page_params));
        }
    }

    subscribeRoutes() {
        var defaultOptions = {
            root: false
        };
        this.deeplinks.routeWithNavController(this.nav, {
            '/about': 'about',
            '/goal/:goalId': 'goal-home',
            '/event/:eventId': 'event-detail'
        }, defaultOptions).subscribe(
            match => {
                console.log(JSON.stringify(match));
                if (match.$route) {
                    this.nav.push(match.$route, match.$args);
                }
                // return true;
            }, nomatch => {
                console.error('Got a deeplink that didn\'t match', JSON.stringify(nomatch));
                return true;
            });
    }
}

