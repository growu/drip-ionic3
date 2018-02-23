import {Directive, Input} from '@angular/core';
import {ToastProvider} from "../providers/toast/toast";

@Directive({
    selector: '[check-pro]',
    host: {
        '(ionChange)':          'onClick()'
    }
})
export class CheckPro {
    @Input() isPro: string;

    constructor(private toastProvider:ToastProvider) {

    }

    onClick() {
        if(!this.isPro) {
            this.toastProvider.show("warning","此功能仅限pro用户使用");

        }
    }

}