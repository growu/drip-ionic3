import {Component} from '@angular/core';
import {Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {UserProvider} from '../providers/user/user';
import {Storage} from '@ionic/storage';

// declare var JPushPlugin;

@Component({
    templateUrl: 'app.html'
})

export class MyApp {
    rootPage: any = 'welcome';

    constructor(platform: Platform,
                statusBar: StatusBar,
                splashScreen: SplashScreen,
                storage: Storage,
                public userProvider: UserProvider) {
        platform.ready().then(() => {
            statusBar.styleDefault();
            splashScreen.hide();
            if (platform.is('cordova')) {
                (<any>window).plugins.jPushPlugin.init();
                // (<any>window).plugins.JPush.init();
                // JPushPlugin.init();
                if(!platform.is('android')) {
                    (<any>window).plugins.jPushPlugin.setDebugModeFromIos(true);
                    (<any>window).plugins.jPushPlugin.setApplicationIconBadgeNumber(0);
                } else {
                    (<any>window).plugins.jPushPlugin.setDebugMode(true);
                    (<any>window).plugins.jPushPlugin.setStatisticsOpen(true);
                }
            }

          
        });
    }
}

