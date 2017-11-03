import {NgModule} from '@angular/core';
import {IonicModule} from 'ionic-angular';
import {MyShareImageModal} from './my-share-image.modal';

@NgModule({
    declarations: [
        MyShareImageModal
    ],
    imports: [
        IonicModule,
    ],
    providers: [
    ],
    exports: [
        MyShareImageModal
    ],
    entryComponents: [
        MyShareImageModal
    ],
})
export class MyShareImageModule {
}
