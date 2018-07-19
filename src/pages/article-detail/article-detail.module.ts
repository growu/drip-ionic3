import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ArticleDetailPage } from './article-detail';
import {MomentModule} from 'angular2-moment';

@NgModule({
  declarations: [
    ArticleDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(ArticleDetailPage),
      MomentModule
  ],
})
export class ArticleDetailPageModule {}
