import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserHomePhotosPage } from './user-home-photos';
import { DpLoaderComponentModule } from '../../components/dp-loader/dp-loader.module';

@NgModule({
  declarations: [
    UserHomePhotosPage,
  ],
  imports: [
      IonicPageModule.forChild(UserHomePhotosPage),
      DpLoaderComponentModule
  ],
})
export class UserHomePhotosPageModule {}
