/**
 * Created by Jason.z on 2017/7/4.
 */
import {Component, ViewChild} from '@angular/core';
import {Tabs, IonicPage, LoadingController, Platform} from 'ionic-angular';
import {Storage} from '@ionic/storage';
import {UserProvider} from "../../providers/user/user";
import {InAppBrowser} from '@ionic-native/in-app-browser';
import {ToastProvider} from "../../providers/toast/toast";
import * as moment from 'moment'
import swal from "sweetalert2";
import {VersionProvider} from "../../providers/version/version";

declare var chcp;

@IonicPage({
    name: 'main',
})
@Component({
    selector: 'page-main',
    templateUrl: 'main.html'
})
export class MainPage {

    @ViewChild('mainTabs') tabs: Tabs;

    homeRoot: string = 'home';
    explorerRoot: string = 'explore';
    eventRoot: string = 'event';
    myRoot: string = 'my';
    messageRoot:string = 'message'
    messageCount: number = 0;
    isShowBtn:boolean = true;
    tabBarElement: any;
    private timer: any;

    constructor(public storage: Storage,
                private loadingCtrl: LoadingController,
                private versionProvider: VersionProvider,
                private iab: InAppBrowser,
                private platform: Platform,
                private toastProvider: ToastProvider,
                userProvider: UserProvider) {

        this.timer = setInterval(() => {
            userProvider.getNewMessages().then((data)=>{
                this.messageCount = data.total_count;
                storage.set('messages',data);
            }).catch((err)=>{

            })
        }, 100000);

        if(this.platform.is('cordova')) {
            // 检查更新
            setTimeout( () => {

                // this.storage.get("last_check_update_time").then((time)=> {
                //
                //     let is_check = true;
                //
                //     if (time) {
                //         if (moment(time).format('YYYY-MM-DD') == moment().format('YYYY-MM-DD')) {
                //             is_check = false;
                //         }
                //     }
                //
                //     if(is_check) {
                this.versionProvider.checkVersion().then((res) => {
                    console.log("请求更新结果：");
                    console.log(res);

                    if(res.is_audit) {
                        this.versionProvider.setAudit(true);
                        return;
                    }

                    if (res.type > 0) {
                        swal({
                            title: '水滴打卡有新版本可以更新',
                            html: res.message,
                            showConfirmButton: true,
                            confirmButtonText:'升级到最新版本',
                            showCancelButton: false,
                            cancelButtonText:'',
                            showCloseButton:true,
                            padding: 0,
                            confirmButtonClass:'dp-swal-confirm-button',
                            cancelButtonClass:'dp-swal-cancel-button',
                            width:'80%',
                        }).then((result) => {
                            if(result.value) {
                                // this.storage.remove('last_check_update_time');
                                if (res.type == 1) {
                                    let loading = this.loadingCtrl.create({
                                        content: '正在更新，请稍候...'
                                    });

                                    loading.present();
                                    loading.data.content = "开始检查本地是否存在更新包...";

                                    chcp.isUpdateAvailableForInstallation((error, data) => {

                                        if (error) {
                                            loading.data.content  = '未发现更新包，正在向服务器请求..';

                                            chcp.fetchUpdate((error, data) => {
                                                if (error) {
                                                    loading.dismiss();
                                                    this.toastProvider.show("请求更新包失败:"+error.description+"("+error.code+")","error");
                                                } else {
                                                    loading.data.content  = '发现更新包（'+data.readyToInstallVersion+'），开始安装..';

                                                    console.log('当前版本: ' + data.currentVersion);
                                                    console.log('最新版本: ' + data.readyToInstallVersion);

                                                    chcp.installUpdate((error) => {
                                                        loading.dismiss();
                                                        if (error) {
                                                            this.toastProvider.show("安装更新失败:"+error.description+"("+error.code+")","error");
                                                        } else {
                                                            this.toastProvider.show("安装更新成功","success");
                                                        }
                                                    },);
                                                }
                                            });
                                        } else {
                                            console.log('当前版本: ' + data.currentVersion);
                                            console.log('最新版本: ' + data.readyToInstallVersion);

                                            loading.data.content  = '发现更新包（'+data.readyToInstallVersion+'），开始安装..';

                                            chcp.installUpdate((error) => {
                                                loading.dismiss();
                                                if (error) {
                                                    this.toastProvider.show("安装更新失败:"+error.description+"("+error.code+")","error");
                                                } else {
                                                    this.toastProvider.show("安装更新成功","success");
                                                }
                                            },);
                                        }
                                    });

                                } else if (res.type == 2) { //跳转更新
                                    this.iab.create(res.url, '_blank', 'toolbar=yes');
                                }
                            }  else if (result.dismiss === swal.DismissReason.cancel) {
                                // this.storage.set('last_check_update_time',moment());
                            }
                        }, dismiss => {

                        });
                    }

                }).catch((err) => {
                });
                //     }
                // }).catch((err)=>{
                // });

            }, 10000);
        }

    }

    ionViewDidLoad() {
        console.log("main view did enter");
    }

        /**
     * 跳转到主页
     */
    goHomePage() {
        if(this.tabs) {
            this.tabs.select(2);
        }
    }

    /**
     * 判断是否为子页面
     * @returns {boolean}
     */
    isSubPage() {
        this.tabBarElement = document.querySelector('.tab-subpage');
        if(this.tabBarElement) {
            return true;
        }
        return false;
    }

    ionViewDidLeave() {
        clearInterval(this.timer);
        this.isShowBtn = false;
    }

}