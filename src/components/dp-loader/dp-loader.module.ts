import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { DpLoaderComponent } from './dp-loader';

@NgModule({
    declarations: [
        DpLoaderComponent,
    ],
    imports: [
        IonicModule,
    ],
    exports: [
        DpLoaderComponent
    ]
})
export class DpLoaderComponentModule {}
