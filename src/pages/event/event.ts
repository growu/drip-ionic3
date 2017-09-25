import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams} from 'ionic-angular';
import { EventProvider } from '../../providers/event/event'

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

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public eventProvider:EventProvider) {
    this.events = Array(6).fill(0).map((x,i)=>i);
  }

  ionViewDidLoad() {
    this.getEvents();
  }

  getEvents() {
    this.eventProvider.getEvents(this.mode).then((data)=>{
      this.events = data;
    });
  }

  goEventDetailPage(event) {
    this.navCtrl.push('event-detail',{'id':event.id});
  }

}
