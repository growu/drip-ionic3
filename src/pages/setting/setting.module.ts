import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SettingPage } from './setting';
import { AppRate } from '@ionic-native/app-rate';
import { AppRateMock } from '@ionic-native-mocks/app-rate';


@NgModule({
  declarations: [
    SettingPage,
  ],
  imports: [
    IonicPageModule.forChild(SettingPage),
  ],
  providers: [
      { provide: AppRate, useClass: AppRateMock}
  ]
})
export class SettingPageModule {}
