import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams} from 'ionic-angular';
import { EventProvider } from '../../providers/event/event'

@IonicPage({
  name:'event-detail',
  segment:'event/:id/detail'
})
@Component({
  selector: 'page-event-detail',
  templateUrl: 'event-detail.html',
})
export class EventDetailPage {
  private event:any;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public eventProvider:EventProvider) {
  }

  ionViewDidLoad() {
    this.getEventDetail();
  }

  getEventDetail() {
    var id = this.navParams.get("id");
    this.eventProvider.getEventDetail(id).then((data)=>{
      this.event = data;
    });
  }

  goEventLikePage() {
    var id = this.navParams.get("id");
    this.navCtrl.push('page-event-like',{'id':id});
  }

}
