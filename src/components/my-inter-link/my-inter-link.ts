import {Component, Input} from '@angular/core';
import {NavController} from "ionic-angular";

@Component({
  selector: 'my-inter-link',
  templateUrl: 'my-inter-link.html'
})
export class MyInterLinkComponent {

  @Input() page = '';
  @Input() params;
  @Input() content;

  constructor(private navCtrl:NavController) {
  }

  goState(){
    this.navCtrl.push(this.page,this.params)
  }

}
