import {Component, Input} from '@angular/core';
import {ActionSheetController, AlertController} from "ionic-angular";
import {UserProvider} from "../../providers/user/user";
import {ToastProvider} from "../../providers/toast/toast";

@Component({
    selector: 'dp-user-menu',
    templateUrl: 'dp-user-menu.html'
})
export class DpUserMenuComponent {

    @Input() user;

    constructor(private actionSheetCtrl: ActionSheetController,
                private userProvider: UserProvider,
                private toastProvider: ToastProvider,
                private alertCtrl: AlertController) {

    }

    /**
     * 显示菜单
     *
     */
    showMenu() {
        let actionSheet = this.actionSheetCtrl.create({
            title: '更多操作',
            buttons: [
                {
                    text: '举报',
                    handler: () => {
                        this.setReport();
                    }
                },
                {
                    text: '加入黑名单',
                    role: 'destructive',
                    handler: () => {
                        this.setBlackList();
                    }
                },
                {
                    text: '取消',
                    role: 'cancel',
                    handler: () => {
                    }
                }
            ]
        });

        actionSheet.present();
    }

    /**
     * 设置黑名单
     */
    setBlackList() {
        let confirm = this.alertCtrl.create({
            title: '确认将他/她列入黑名单?',
            message: '加入黑名单后，双方将无法收到私信等操作',
            buttons: [
                {
                    text: '取消',
                    handler: () => {
                    }
                },
                {
                    text: '确认',
                    cssClass: 'my-alert-danger',
                    handler: () => {
                        this.userProvider.blacklistUser(this.user.id).then((data) => {
                            this.toastProvider.show("操作成功", 'success');
                        }).catch((err) => {
                        });
                    }
                }
            ]
        });
        confirm.present();
    }

    /**
     * 举报
     *
     */
    setReport() {

        let alert = this.alertCtrl.create();
        alert.setTitle('请选择举报的原因！');

        alert.addInput({
            type: 'radio',
            label: '色情/低俗内容',
            value: '1',
            checked: true
        });

        alert.addInput({
            type: 'radio',
            label: '广告推销',
            value: '2',
        });

        alert.addInput({
            type: 'radio',
            label: '反动/政治问题',
            value: '3',
        });

        alert.addInput({
            type: 'radio',
            label: '其他',
            value: '4',
        });


        alert.addButton('取消');
        alert.addButton({
            text: '确定',
            handler: data => {

                let body = {
                    reason: data
                };

                this.userProvider.reportUser(this.user.id, body).then((data) => {
                    this.toastProvider.show("操作成功", 'success');
                }).catch((err) => {
                });
            }
        });
        alert.present();
    }
}
