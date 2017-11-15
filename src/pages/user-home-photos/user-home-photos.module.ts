import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserHomePhotosPage } from './user-home-photos';

@NgModule({
  declarations: [
    UserHomePhotosPage,
  ],
  imports: [
    IonicPageModule.forChild(UserHomePhotosPage),
  ],
})
export class UserHomePhotosPageModule {}
