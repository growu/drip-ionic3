import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Device } from '@ionic-native/device';
import { StatusBar } from '@ionic-native/status-bar';
import { MyApp } from './app.component';
import { IonicStorageModule } from '@ionic/storage';


import { MyHammerConfig } from '../components/MyHammerConfig'
import { HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { UserProvider } from '../providers/user/user';
import { HttpProvider } from '../providers/http/http';
import { GoalProvider } from '../providers/goal/goal';


@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicStorageModule.forRoot({
      name: 'drip_db',
      driverOrder: ['sqlite', 'websql','indexdb','localstorage']
    }),
    IonicModule.forRoot(MyApp,{
      backButtonText: '',
      tabsHideOnSubPages:true,
      monthNames: ['一', '二', '三','四','五', '六', '七','八','九', '十', '十一','十二'],
      monthShortNames: ['一月', '二月', '三月','四月','五月', '六月', '七月','八月','九月', '十月', '十一月','十二月'],
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Device,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: MyHammerConfig
    },
    UserProvider,
    HttpProvider,
    GoalProvider
  ]
})
export class AppModule {}
