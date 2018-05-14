import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserSearchPage } from './user-search';

@NgModule({
  declarations: [
    UserSearchPage,
  ],
  imports: [
    IonicPageModule.forChild(UserSearchPage),
  ],
})
export class UserSearchPageModule {}
