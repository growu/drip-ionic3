import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { MyWeekCalendarComponent } from './my-week-calendar';

@NgModule({
  declarations: [
    MyWeekCalendarComponent,
  ],
  imports: [
    IonicModule,
  ],
  exports: [
    MyWeekCalendarComponent
  ]
})
export class MyWeekCalendarComponentModule {}
