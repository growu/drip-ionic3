import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ArticleDetailPage } from './article-detail';

@NgModule({
  declarations: [
    ArticleDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(ArticleDetailPage),
  ],
})
export class ArticleDetailPageModule {}
