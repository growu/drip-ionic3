import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { MyThirdLoginComponent } from './my-third-login';

@NgModule({
    declarations: [
        MyThirdLoginComponent,
    ],
    imports: [
        IonicModule,
    ],
    exports: [
        MyThirdLoginComponent
    ]
})
export class MyThirdLoginComponentModule {}
