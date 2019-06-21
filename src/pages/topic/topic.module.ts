import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TopicPage } from './topic';
import {DpEventComponentModule} from '../../components/dp-event/dp-event.module';

@NgModule({
  declarations: [
    TopicPage,
  ],
  imports: [
    IonicPageModule.forChild(TopicPage),
      DpEventComponentModule
  ],
})
export class TopicPageModule {}
