import { NgModule } from '@angular/core';
import { MyEventContentComponent } from './my-event-content/my-event-content';
import { MyInterLinkComponent } from './my-inter-link/my-inter-link';
@NgModule({
	declarations: [
    MyEventContentComponent,
    MyInterLinkComponent],
	imports: [],
	exports: [
    MyEventContentComponent,
    MyInterLinkComponent]
})
export class ComponentsModule {}
