# drip-ionic3

「水滴打卡」App源码(包含安卓和ios平台)，基于[Ionic Framework v3](http://ionicframework.com/)创建。

# 示例app

[下载地址](http://a.app.qq.com/o/simple.jsp?pkgname=me.growu.drip)

![二维码](qrcode.png)



# 如何使用


```bash
git clone https://github.com/growu/drip-ionic3

cd drip-ionic3

npm install

ionic cordova platform add ios

ionic cordova platform add android

ionic cordova run ios

ionic cordova run ios
```

# 注意事项

1. 由于ionic2-super-tabs插件的问题

需要手动复制文件https://raw.githubusercontent.com/zyra/ionic2-super-tabs/master/src/components/super-tabs.scss
到*node_modules/ionic2-super-tabs/dist/components*下



2. 由于app-scripts3.19.2版本在AOT环境下编译会报错[ISSUES](https://github.com/ionic-team/ionic-cli/issues/2889)

需要修改 node_modules/@ionic/app-scripts/dist/logger/logger-typescript.js的29行

原来：

```if (tsDiagnostic.file) {```

修改为：

```if (tsDiagnostic.file && tsDiagnostic.file.getText) {```

# 相关项目

Ionic V1版本源码：[drip-ionic](https://github.com/growu/drip-ionic)
后台api接口源码：[drip-website](https://github.com/growu/drip-website)

# 关于我们

官网：[http://drip.growu.me](http://drip.growu.me)

微信公众号：格吾社区（growuu）

新浪微博：[格吾社区](http://weibo.com/growu)

# 问题反馈

qq群：783459080

[![ionic付费问答群](https://pub.idqqimg.com/wpa/images/group.png)](https://hang.qq.com/wpa/qunwpa?idkey=26fee235eae2460a35007c9790b5661b0a97033c948550fe06936a2cbbda009b)

# 赞赏



如果我们的项目对你有帮助，欢迎赞赏。

![](donate.png)

# License

本APP遵循GPLv3协议，源代码仅供参考学习，请勿用作商业用途。




