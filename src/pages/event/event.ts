import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams} from 'ionic-angular';

@IonicPage({
  name:'event',
  segment:'event'
})
@Component({
  selector: 'page-event',
  templateUrl: 'event.html',
})
export class EventPage {
  public mode:string = "hot";
  public events:any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.events = Array(6).fill(0).map((x,i)=>i);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventPage');
  }

}
