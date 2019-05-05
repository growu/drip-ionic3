import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserHomePhotosPage } from './user-home-photos';
import { MyLoaderComponentModule } from '../../components/my-loader/my-loader.module';

@NgModule({
  declarations: [
    UserHomePhotosPage,
  ],
  imports: [
      IonicPageModule.forChild(UserHomePhotosPage),
      MyLoaderComponentModule
  ],
})
export class UserHomePhotosPageModule {}
