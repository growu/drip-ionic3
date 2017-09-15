import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomeMenuPage } from './home-menu';

@NgModule({
  declarations: [
    HomeMenuPage,
  ],
  imports: [
    IonicPageModule.forChild(HomeMenuPage),
  ],
})
export class HomeMenuPageModule {}
