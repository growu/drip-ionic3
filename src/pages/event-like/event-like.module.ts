import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EventLikePage } from './event-like';
import {DpFollowButtonComponentModule} from "../../components/dp-follow-button/dp-follow-button.module";
import {DpLoaderComponentModule} from '../../components/dp-loader/dp-loader.module';

@NgModule({
  declarations: [
      EventLikePage,
  ],
  imports: [
      IonicPageModule.forChild(EventLikePage),
      DpFollowButtonComponentModule,
      DpLoaderComponentModule
  ],
})
export class EventLikePageModule {}
