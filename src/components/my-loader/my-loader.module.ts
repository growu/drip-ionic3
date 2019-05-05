import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { MyLoaderComponent } from './my-loader';

@NgModule({
    declarations: [
        MyLoaderComponent,
    ],
    imports: [
        IonicModule,
    ],
    exports: [
        MyLoaderComponent
    ]
})
export class MyLoaderComponentModule {}
