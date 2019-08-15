import {Component, Input} from '@angular/core';
import {NavController} from "ionic-angular";
import {VersionProvider} from "../../providers/version/version";

@Component({
    selector: 'dp-vip-button',
    templateUrl: 'dp-vip-button.html'
})
export class DpVipButtonComponent {

    public color: string = 'gray';
    public text: string = 'FREE';
    public isShow: boolean = true;
    private isAudit: boolean = false;
    public _user:any;

    constructor(protected navCtrl: NavController,protected versionProvider:VersionProvider) {
        this.isAudit = this.versionProvider.getAudit();
        if(this.isAudit) {
            this.isShow = false;
        }
    }

    @Input()
    set user(user) {
        if(!user) return;
        this._user = user;
        if(user.vip_type == 1) {
            this.color = 'yellow';
            this.text = 'PRO';
        } else if(user.vip_type == 2) {
            this.color = 'primary';
            this.text = 'TEAM';
        } else if(user.vip_type == 0) {
            this.color = 'gray';
            this.text = 'FREE';
        } else {
            if (!this.isAudit) {
                this.isShow = false;
            }
        }
    }

    @Input()
    set showFree(value: any) {
        if(!this._user) return;
        if(!this.isAudit && value) {
            if(this._user.vip_type>0) {
                this.isShow = true;
            }
        }
    }

    /**
     * 跳转到VIP页面
     */
    goVipPage() {
        this.navCtrl.push("vip", {});
    }

}
