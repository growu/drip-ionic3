import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams} from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Platform } from 'ionic-angular';

@IonicPage({
  name:'about',
})
@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})
export class AboutPage {
  public qqQunUrl:string = '';
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private iab: InAppBrowser,
              public platform:Platform) {

    if (this.platform.is('ios')) {
      this.qqQunUrl = 'mqqapi://card/show_pslcard?src_type=internal&version=1&uin=7852084&key=ae5495ce139b42cc872fdd0da42fc3e6527731aa040ae569fa17ba6e17edd531&card_type=group&source=external';

    } else if (this.platform.is('android')) {
      this.qqQunUrl = 'mqqopensdkapi://bizAgent/qm/qr?url=http%3A%2F%2Fqm.qq.com%2Fcgi-bin%2Fqm%2Fqr%3Ffrom%3Dapp%26p%3Dandroid%26k%3D65XQJ2wNSi1AwllnyzOvIVQKO8rcgTtZ';
    } else {
      this.qqQunUrl = 'http://shang.qq.com/wpa/qunwpa?idkey=ae5495ce139b42cc872fdd0da42fc3e6527731aa040ae569fa17ba6e17edd531';
    }
  }

  ionViewDidLoad() {
  }

  openUrl(url:string) {
    this.iab.create(url,'_blank','toolbar=yes');
  }

}
