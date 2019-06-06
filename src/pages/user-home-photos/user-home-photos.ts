import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {UserProvider} from "../../providers/user/user";

@IonicPage({
    name:'user-home-photos',
    segment:'photos'
})
@Component({
  selector: 'page-user-home-photos',
  templateUrl: 'user-home-photos.html',
})
export class UserHomePhotosPage {

    public photos:any = [];
    public userId:any = null;
    public perPage:number = 12;
    public isLoading:boolean = false;

      constructor(public navCtrl: NavController,
                  public userProvider: UserProvider,
                  public navParams: NavParams) {

          this.userId = this.navParams.get('id')

      }

      ionViewDidLoad() {
          this.isLoading  = true;
          this.getUsersPhotos().then(data=>{
              this.isLoading  = false;
          }).catch(err=>{
              this.isLoading  = false;
          });
      }

    /**
     * 获取用户相册
     *
     * @returns {Promise<Promise<Response>>}
     */
    getUsersPhotos() {
          return this.userProvider.getUsersPhotos(this.userId,this.perPage,this.photos.length).then((data) => {
              if(this.photos.length == 0) {
                  this.photos = data;
              } else {
                  this.photos = this.photos.concat(data);
              }
          })
      }

    doInfinite(infiniteScroll) {

        setTimeout(() => {
            infiniteScroll.complete();
        }, 10000);

        this.getUsersPhotos().then(data=>{
            infiniteScroll.complete();
        }).catch(err=>{
            infiniteScroll.complete();
        });
    }

}
