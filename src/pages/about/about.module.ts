import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AboutPage } from './about';
import { InAppBrowser } from '@ionic-native/in-app-browser';

@NgModule({
  declarations: [
    AboutPage,
  ],
  imports: [
    IonicPageModule.forChild(AboutPage),
  ],
  providers:[
    InAppBrowser
  ]
})
export class AboutPageModule {}
