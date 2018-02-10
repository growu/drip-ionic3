import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TopicPage } from './topic';
import {MyEventComponentModule} from '../../components/my-event/my-event.module';

@NgModule({
  declarations: [
    TopicPage,
  ],
  imports: [
    IonicPageModule.forChild(TopicPage),
      MyEventComponentModule
  ],
})
export class TopicPageModule {}
