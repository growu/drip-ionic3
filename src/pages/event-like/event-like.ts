import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams} from 'ionic-angular';
import { EventProvider } from '../../providers/event/event'
import { UserProvider } from '../../providers/user/user'

@IonicPage({
  name:'page-event-like',
  segment:'event/:id/like'
})
@Component({
  selector: 'page-event-like',
  templateUrl: 'event-like.html',
})
export class EventLikePage {
  public likes:any = [];
  private perPage:number = 20;


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public eventProvider: EventProvider,
              public userProvider: UserProvider) {
  }

  ionViewDidLoad() {
    this.getEventLikes(1);
  }

  getEventLikes(page) {
    var id = this.navParams.get("id");

    this.eventProvider.getEventLikes(id,page,this.perPage).then((data)=>{
      this.likes = data;
    });
  }

  doRefresh(refresher) {

    this.getEventLikes(1);

    setTimeout(() => {
      refresher.complete();
    }, 2000);
  }

  doInfinite(infiniteScroll) {

    var num = this.likes.length;

    if (num > 0 && num % 20 == 0) {
      var page = Math.floor(this.likes.length/20)+1;
      this.getEventLikes(page);
    }

    setTimeout(() => {
      infiniteScroll.complete();
    }, 2000);
  }

  doFollow(like) {
    this.userProvider.follow(like.user.id).then((data)=>{
      let index =  this.likes.indexOf(like);
      this.likes[index].user.is_follow = true;
    });
  }

}
