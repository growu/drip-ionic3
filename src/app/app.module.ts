import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { MyApp } from './app.component';

import { MyHammerConfig } from '../components/MyHammerConfig'
import { HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';


@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp,{
      backButtonText: '',
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
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: MyHammerConfig
    }
  ]
})
export class AppModule {}
