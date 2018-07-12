import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {HttpProvider} from "../../providers/http/http";


@IonicPage({
    segment:'article/:id/detail',
    name:'article-detail'
})
@Component({
  selector: 'page-article-detail',
  templateUrl: 'article-detail.html',
})
export class ArticleDetailPage {

  public article;

  constructor(public navCtrl: NavController,
              private httpProvider: HttpProvider,
              public navParams: NavParams) {
  }

  ionViewDidLoad() {
    let id = this.navParams.get("id");

    this.httpProvider.httpGetWithAuth('/article/'+id,null).then(
        (data)=>{
          this.article = data;
        }
    )
  }

}
