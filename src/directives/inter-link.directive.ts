
import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
    selector: '[inter-link]'
})
export class InterLinkDirective {
    constructor(public viewContainerRef: ViewContainerRef) { }
}