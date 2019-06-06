import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {InAppBrowser} from '@ionic-native/in-app-browser';
import {Platform} from 'ionic-angular';
import {ToastProvider} from '../../providers/toast/toast';
import {VersionProvider} from "../../providers/version/version";

declare var chcp;

@IonicPage({
    name: 'about',
})
@Component({
    selector: 'page-about',
    templateUrl: 'about.html',
})
export class AboutPage {
    public qqQunUrl: string = '';
    public isUpdate: boolean = false;
    public isInstall: boolean = false;

    public appVersion: string = '--';
    public webVersion: string = '--';

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                private iab: InAppBrowser,
                private toastProvier: ToastProvider,
                private versionProvider: VersionProvider,
                public platform: Platform) {

        if (this.platform.is('ios')) {
            this.qqQunUrl = 'mqqapi://card/show_pslcard?src_type=internal&version=1&uin=7852084&key=ae5495ce139b42cc872fdd0da42fc3e6527731aa040ae569fa17ba6e17edd531&card_type=group&source=external';
        } else if (this.platform.is('android')) {
            this.qqQunUrl = 'mqqopensdkapi://bizAgent/qm/qr?url=http%3A%2F%2Fqm.qq.com%2Fcgi-bin%2Fqm%2Fqr%3Ffrom%3Dapp%26p%3Dandroid%26k%3D65XQJ2wNSi1AwllnyzOvIVQKO8rcgTtZ';
        } else {
            this.qqQunUrl = 'http://shang.qq.com/wpa/qunwpa?idkey=ae5495ce139b42cc872fdd0da42fc3e6527731aa040ae569fa17ba6e17edd531';
        }
    }

    ionViewDidLoad() {
        // 获取版本号
        if (this.platform.is('cordova')) {
            this.appVersion = this.versionProvider.getAppVersion();
            this.webVersion = this.versionProvider.getWebVersion(true);
        }
    }

    /**
     * 打卡URL
     *
     * @param {string} url
     */
    openUrl(url: string,target:string='_blank') {
        this.iab.create(url, target, 'location=no,toolbar=yes,toolbarposition=top,closebuttoncaption=关闭');
    }

    /**
     * 执行更新
     *
     */
    doUpdate() {
        if (this.isInstall) {
            chcp.installUpdate((error) => {
                if (error) {
                    console.log('安装更新失败: ' + error.code);
                    console.log(error.description);
                } else {
                    console.log('更新已安装!');
                }
            },);
        }
    }

    /**
     * 复制公众号回调
     *
     */
    copyCallback() {
        this.toastProvier.show("公众号已复制到剪贴板", 'success');
    }

}
