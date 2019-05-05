import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EventLikePage } from './event-like';
import {MyFollowButtonComponentModule} from "../../components/my-follow-button/my-follow-button.module";
import {MyLoaderComponentModule} from '../../components/my-loader/my-loader.module';

@NgModule({
  declarations: [
      EventLikePage,
  ],
  imports: [
      IonicPageModule.forChild(EventLikePage),
      MyFollowButtonComponentModule,
      MyLoaderComponentModule
  ],
})
export class EventLikePageModule {}
