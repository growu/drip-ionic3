/**
 * Created by Jason.z on 2017/7/4.
 */

import {Component, ViewChild} from '@angular/core';
import {NavController, Tabs, IonicPage, Platform, AlertController, LoadingController} from 'ionic-angular';
import {Storage} from '@ionic/storage';
import {UserProvider} from "../../providers/user/user";
import {UpdateProvider} from "../../providers/update/update";
import {InAppBrowser} from '@ionic-native/in-app-browser';
import {ToastProvider} from "../../providers/toast/toast";
import * as moment from 'moment'
import swal from "sweetalert2";

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
                private platform: Platform,
                private navCtrl: NavController,
                private alertCtrl: AlertController,
                private loadingCtrl: LoadingController,
                private updateProvider: UpdateProvider,
                private iab: InAppBrowser,
                private toastProvider: ToastProvider,
                userProvider: UserProvider) {
        //storage.get("messages").then((data)=>{
        //     this.messageCount = data.total_count;
        // });

        this.timer = setInterval(() => {
            userProvider.getNewMessages().then((data)=>{
                this.messageCount = data.total_count;
                storage.set('messages',data);
            }).catch((err)=>{

            })
        }, 100000);


        // 检查更新
        setTimeout( () => {

            this.storage.get("last_check_update_time").then((time)=> {

                let is_check = true;

                if (time) {
                    if (moment(time).format('YYYY-MM-DD') == moment().format('YYYY-MM-DD')) {
                        is_check = false;
                    }
                }

                if(is_check) {
                    this.checkUpdate();
                }
            }).catch((err)=>{
            });

        }, 10000);
    }

    checkUpdate(){
        if (this.platform.is('cordova')) {

            let webVersion;
            let appVersion;

            chcp.getVersionInfo((err, data) => {

                        console.log(err);
                        console.log(data);

                        if (data.currentWebVersion) {
                            webVersion = data.currentWebVersion.replace(/-/g, '');
                            webVersion = webVersion.replace(/\./g, '');
                        }

                        appVersion = data.appVersion;

                        //请求服务器版本
                        this.updateProvider.checkUpdate(data.appVersion, webVersion).then((res) => {
                            console.log("请求更新结果：");
                            console.log(res);

                            if (res.type > 0) {

                                swal({
                                    title: '发现新版本，是否更新?',
                                    html: res.message,
                                    showConfirmButton: true,
                                    confirmButtonText:'立即更新',
                                    showCancelButton: true,
                                    cancelButtonText:'稍后更新',
                                    padding: 0
                                }).then((result) => {
                                    if(result.value) {
                                        this.storage.remove('last_check_update_time');

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
                                            this.iab.create("http://a.app.qq.com/o/simple.jsp?pkgname=me.growu.drip", '_blank', 'toolbar=yes');
                                        }
                                    }  else if (result.dismiss === swal.DismissReason.cancel) {
                                        this.storage.set('last_check_update_time',data);
                                    }
                                }, dismiss => {

                                });


                                // let confirm = this.alertCtrl.create({
                                //     title: '发现新版本，是否更新?',
                                //     message: res.message,
                                //     buttons: [
                                //         {
                                //             text: '稍后更新',
                                //             handler: () => {
                                //                 console.log('取消更新');
                                //                 this.storage.set('last_check_update_time',data).then(()=>{
                                //                 });
                                //             }
                                //         },
                                //         {
                                //             text: '立即更新',
                                //             handler: () => {
                                //                 this.storage.remove('last_check_update_time').then(()=>{
                                //
                                //                 });
                                //
                                //
                                //                 if (res.type == 1) {
                                //                     let loading = this.loadingCtrl.create({
                                //                         content: '正在更新，请稍候...'
                                //                     });
                                //
                                //                     loading.present();
                                //
                                //                     loading.data.content = "开始检查本地是否存在更新包...";
                                //
                                //                     chcp.isUpdateAvailableForInstallation((error, data) => {
                                //
                                //                         if (error) {
                                //
                                //                             loading.data.content  = '未发现更新包，正在向服务器请求..';
                                //
                                //                             chcp.fetchUpdate((error, data) => {
                                //                                 if (error) {
                                //                                     loading.dismiss();
                                //                                     this.toastProvider.show("请求更新包失败:"+error.description+"("+error.code+")","error");
                                //                                 } else {
                                //                                     loading.data.content  = '发现更新包（'+data.readyToInstallVersion+'），开始安装..';
                                //
                                //                                     console.log('当前版本: ' + data.currentVersion);
                                //                                     console.log('最新版本: ' + data.readyToInstallVersion);
                                //
                                //                                     chcp.installUpdate((error) => {
                                //                                         loading.dismiss();
                                //                                         if (error) {
                                //                                             this.toastProvider.show("安装更新失败:"+error.description+"("+error.code+")","error");
                                //                                         } else {
                                //                                             this.toastProvider.show("安装更新成功","success");
                                //                                         }
                                //                                     },);
                                //                                 }
                                //                             });
                                //                         } else {
                                //                             console.log('当前版本: ' + data.currentVersion);
                                //                             console.log('最新版本: ' + data.readyToInstallVersion);
                                //
                                //                             loading.data.content  = '发现更新包（'+data.readyToInstallVersion+'），开始安装..';
                                //
                                //                             chcp.installUpdate((error) => {
                                //                                 loading.dismiss();
                                //                                 if (error) {
                                //                                     this.toastProvider.show("安装更新失败:"+error.description+"("+error.code+")","error");
                                //                                 } else {
                                //                                     this.toastProvider.show("安装更新成功","success");
                                //                                 }
                                //                             },);
                                //                         }
                                //                     });
                                //
                                //                 } else if (res.type == 2) { //跳转更新
                                //                     this.iab.create("http://a.app.qq.com/o/simple.jsp?pkgname=me.growu.drip", '_blank', 'toolbar=yes');
                                //                 }
                                //             }
                                //         }
                                //     ]
                                // });
                                // confirm.present();
                            }
                        }).catch((err) => {

                        });



                    });
        }
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

    ionViewDidLoad() {
    }

    ionViewDidEnter() {

    }

    ionViewDidLeave() {
        console.log("view leave");
        clearInterval(this.timer);
        this.isShowBtn = false;
    }


}