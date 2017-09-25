import {Component, Input} from '@angular/core';
import { UserProvider } from '../../providers/user/user'

/**
 * Generated class for the MyFollowButtonComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'my-follow-button',
  templateUrl: 'my-follow-button.html'
})
export class MyFollowButtonComponent {

  @Input() followStatus;
  @Input() followUser;

  constructor(private userProvider:UserProvider) {
  }

  doFollow($event) {
    $event.stopPropagation();
    this.userProvider.follow(this.followUser).then((data)=>{
      if(data) {
        this.followStatus = true;
      }
    });
  }

  doUnFollow($event) {
    $event.stopPropagation();
    this.userProvider.unFollow(this.followUser).then((data)=>{
        if(data) {
          this.followStatus = false;
        }
    });
  }

}
