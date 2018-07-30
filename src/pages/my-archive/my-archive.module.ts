import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyArchivePage } from './my-archive';
import {PipesModule} from '../../pipes/pipes.module'

@NgModule({
  declarations: [
    MyArchivePage,
  ],
  imports: [
    IonicPageModule.forChild(MyArchivePage),
      PipesModule
  ],
})
export class MyArchivePageModule {}
