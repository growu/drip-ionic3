import {Component, Input} from '@angular/core';
import { ActionSheetController } from 'ionic-angular';
import { EventProvider } from '../../providers/event/event'

@Component({
  selector: 'my-event',
  templateUrl: 'my-event.html',
})
export class MyEventComponent {

  // public events:any = [];
  @Input() eventSource;
  constructor(
      public actionSheetCtrl: ActionSheetController,
      private eventProvider: EventProvider) {
  }

  ionViewDidLoad() {
    console.log(this.eventSource);
  }

  doLike(event,$event) {
    console.log($event);
    let index =  this.eventSource.indexOf(event);

    if(event.is_like) {
      this.eventProvider.unLike(event.id).then((data)=>{
        this.eventSource[index].is_like = false;
        this.eventSource[index].like_count -= 1;
      });
    } else {
      this.eventProvider.like(event.id).then((data)=>{
        this.eventSource[index].is_like = true;
        this.eventSource[index].like_count += 1;
      });
    }
  }

  showMore() {
    let actionSheet = this.actionSheetCtrl.create({
      title: '更多',
      buttons: [
        {
          text: '分享',
          role: 'destructive',
          handler: () => {
            console.log('Destructive clicked');
          }
        },{
          text: '举报',
          handler: () => {
            console.log('Archive clicked');
          }
        },{
          text: '取消',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }
}
