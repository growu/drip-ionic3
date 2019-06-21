import {NgModule} from '@angular/core';
import {IonicModule} from 'ionic-angular';
import {DpShareImageModal} from './dp-share-image.modal';

@NgModule({
    declarations: [
        DpShareImageModal
    ],
    imports: [
        IonicModule,
    ],
    providers: [
    ],
    exports: [
        DpShareImageModal
    ],
    entryComponents: [
        DpShareImageModal
    ],
})
export class DpShareImageModule {
}
