import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';

@IonicPage({
    name:'goal-create-icon',
    segment:'goal/create/icon'
})
@Component({
  selector: 'page-goal-create-icon',
  templateUrl: 'goal-create-icon.html',
})
export class GoalCreateIconPage {

  public icons = [
      "niunai",
      "shucai",
      "icon09",
      "hufu",
      "zuoye",
      "lingshi",
      "xizao",
      "shufa",
      "jianshen",
      "fuwocheng",
      "font11",
      "talk",
      "jiao",
      "yangwoqizuo",
      "yanjiusheng",
      "dazuo",
      "daren",
      "chifan",
      "weixin",
      "renzheng",
      "paobu",
      "shuiguo",
      "yinliao",
      "jin",
      "nan1",
      "yingyu",
      "tingli",
      "shuimian",
      "ps",
      "iconfontshenqingdaren",
      "meirong",
      "professional-hexagon",
      "shaokao",
      "nao-copy",
      "nan",
      "nv",
      "gengduo",
      "xuexi",
      "qinzi",
      "jingxuan",
      "se",
      "qq",
      "keep",
      "qqhaoyou",
      "yuer",
      "qialuli",
      "dianying",
      "lashenyundong",
      "qichuang",
      "jizhang",
      "shuxue",
      "picture",
      "riji",
      "naozhong",
      "jiedu",
      "jita",
      "weibo",
      "tupian",
      "wudao",
      "yundong",
      "gouyao",
      "yuedu",
      "shendun",
      "QQkongjian",
      "hanyu",
      "xinlangweibo",
      "pengyouquan",
      "gangqin",
      "beidanci",
      "jinzhi",
      "shuidi",
      "shangban",
      "zoulu",
      "yan",
      "renzheng1",
      "palouti",
      "zhulingqian",
      "yintixiangshang",
      "tiaosheng",
      "work",
      "riyu",
      "qiandao",
      "duanlian",
      "yuqie",
      "lingqian",
      "zixingche",
      "dianshi",
      "liwu",
      "lu",
      "mingxiang",
      "huahua",
      "dianhua",
      "zaoqi",
      "kaoshi",
      "shuaya",
      "jianfei",
  ];

  public color:string = '#0984e3';

  constructor(public navCtrl: NavController,
              private viewCtrl: ViewController,
              public navParams: NavParams) {

    if(this.navParams.get('color')) {
      this.color = this.navParams.get('color');
    }

  }

  ionViewDidLoad() {

  }

  doChooseIcon(icon) {
    this.viewCtrl.dismiss({icon:icon});
  }

  dismiss(){
      this.viewCtrl.dismiss();
  }

}
