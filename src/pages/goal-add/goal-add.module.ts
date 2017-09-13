import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GoalAddPage } from './goal-add';
import { DatePicker } from '@ionic-native/date-picker';
import { DatePickerMock } from '@ionic-native-mocks/date-picker';

@NgModule({
  declarations: [
    GoalAddPage,
  ],
  imports: [
    IonicPageModule.forChild(GoalAddPage),
  ],
  exports: [
    GoalAddPage
  ],
  providers: [
    DatePicker,
    // { provide: DatePicker, useClass: DatePickerMock }
  ]
})
export class GoalAddPageModule {}
