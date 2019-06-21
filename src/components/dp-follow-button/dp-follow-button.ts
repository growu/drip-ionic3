import {Component, Input} from '@angular/core';
import { UserProvider } from '../../providers/user/user'

@Component({
  selector: 'dp-follow-button',
  templateUrl: 'dp-follow-button.html'
})
export class DpFollowButtonComponent {

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
