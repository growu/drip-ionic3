import {Component, ComponentFactoryResolver, Input, ViewChild} from '@angular/core';
import {MyInterLinkComponent} from "../my-inter-link/my-inter-link";
import {InterLinkDirective} from "../../directives/inter-link.directive";

@Component({
    selector: 'my-event-content',
    templateUrl: 'my-event-content.html'
})
export class MyEventContentComponent {
    @Input() _content: any = '';
    @ViewChild(InterLinkDirective) interLink: InterLinkDirective;

    constructor(private componentFactoryResolver: ComponentFactoryResolver,
    ) {

    }

    @Input()
    set content(value: any) {
        this._content = value;
        this.loadComponent();
    }

    loadComponent() {
        // let componentFactory = this.componentFactoryResolver.resolveComponentFactory(MyInterLinkComponent);
        // let viewContainerRef = this.interLink.viewContainerRef;
        // viewContainerRef.clear();
        //
        // let componentRef = viewContainerRef.createComponent(componentFactory);
        // (<MyInterLinkComponent>componentRef.instance).page = '';
    }

    ngAfterViewInit() {
    }
}
