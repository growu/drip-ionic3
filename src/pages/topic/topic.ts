import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {TopicProvider} from "../../providers/topic/topic";

@IonicPage({
    name:'topic',
    segment:'topic/:name'
})
@Component({
  selector: 'page-topic',
  templateUrl: 'topic.html',
})
export class TopicPage {
  public topic:any;
  public events:any = [];
    private perPage = 20;

  constructor(public navCtrl: NavController,
              private topicProvider:TopicProvider,
              public navParams: NavParams) {

      let name =  this.navParams.get('name');

      this.topicProvider.getTopic(name).then((data)=>{
            console.log(data);
            this.topic = data;
            this.getTopicEvents(1);
      }).catch((err)=>{

      });
  }

  ionViewDidLoad() {

  }

  getTopicEvents(page) {

      this.topicProvider.getEvents(this.topic.id, page, this.perPage).then((data) => {
          if (data) {
              if (page == 1) {
                  this.events = data;
              } else {
                  this.events = this.events.concat(data);
              }
          }
      });
  }

    doInfinite(infiniteScroll) {

        var num = this.events.length;

        if (num > 0 && num % 20 == 0) {
            var page = Math.floor(this.events.length / 20) + 1;
            this.getTopicEvents(page);
        }

        setTimeout(() => {
            infiniteScroll.complete();
        }, 2000);
    }

}
