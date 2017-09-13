import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { MyWeekSelectorComponent } from './my-week-selector';

@NgModule({
  declarations: [
    MyWeekSelectorComponent,
  ],
  imports: [
    IonicModule,
  ],
  exports: [
    MyWeekSelectorComponent
  ]
})
export class MyWeekSelectorComponentModule {}
