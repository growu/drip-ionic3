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

    private timer: any;

    constructor(storage: Storage,
                platform: Platform,
                alertCtrl: AlertController,
                loadingCtrl: LoadingController,
                updateProvider: UpdateProvider,
                iab: InAppBrowser,
                toastProvider: ToastProvider,
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
        }, 60000);


        // 检查更新
        setTimeout( () => {
            if (platform.is('cordova')) {

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
                    updateProvider.checkUpdate(data.appVersion, webVersion).then((res) => {
                        console.log("请求更新结果：");
                        console.log(res);

                        if (res.type > 0) {
                            let confirm = alertCtrl.create({
                                title: '发现新版本，是否更新?',
                                message: res.message,
                                buttons: [
                                    {
                                        text: '稍后更新',
                                        handler: () => {
                                            console.log('取消更新');
                                        }
                                    },
                                    {
                                        text: '立即更新',
                                        handler: () => {
                                            if (res.type == 1) {
                                                let loading = loadingCtrl.create({
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
                                                                toastProvider.show("请求更新包失败:"+error.description+"("+error.code+")","error");
                                                            } else {
                                                                loading.data.content  = '发现更新包（'+data.readyToInstallVersion+'），开始安装..';

                                                                console.log('当前版本: ' + data.currentVersion);
                                                                console.log('最新版本: ' + data.readyToInstallVersion);

                                                                chcp.installUpdate((error) => {
                                                                    loading.dismiss();
                                                                    if (error) {
                                                                        toastProvider.show("安装更新失败:"+error.description+"("+error.code+")","error");
                                                                    } else {
                                                                        toastProvider.show("安装更新成功","success");
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
                                                                toastProvider.show("安装更新失败:"+error.description+"("+error.code+")","error");
                                                            } else {
                                                                toastProvider.show("安装更新成功","success");
                                                            }
                                                        },);
                                                    }
                                                });

                                            } else if (res.type == 2) { //跳转更新
                                                iab.create("http://a.app.qq.com/o/simple.jsp?pkgname=me.growu.drip", '_blank', 'toolbar=yes');
                                            }
                                        }
                                    }
                                ]
                            });
                            confirm.present();
                        }
                    }).catch((err) => {

                    });



                });


            }

        }, 10000);

    }

    ionViewDidLoad() {
    }

    ionViewDidLeave() {
        clearInterval(this.timer);
    }

}