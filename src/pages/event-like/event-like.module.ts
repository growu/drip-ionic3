import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EventLikePage } from './event-like';

@NgModule({
  declarations: [
    EventLikePage,
  ],
  imports: [
    IonicPageModule.forChild(EventLikePage),
  ],
})
export class EventLikePageModule {}
