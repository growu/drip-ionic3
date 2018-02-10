import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import {MyEventContentComponent} from "./my-event-content";

@NgModule({
    declarations: [
        MyEventContentComponent,
    ],
    imports: [
        IonicModule,
    ],
    exports: [
        MyEventContentComponent
    ]
})
export class MyEventContentComponentModule {}
