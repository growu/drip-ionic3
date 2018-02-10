import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { MyInterLinkComponent } from './my-inter-link';

@NgModule({
    declarations: [
        MyInterLinkComponent,
    ],
    imports: [
        IonicModule,
    ],
    exports: [
        MyInterLinkComponent
    ]
})
export class MyInterLinkComponentModule {}
