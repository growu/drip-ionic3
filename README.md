# drip-ionic3

「水滴打卡」App open source code，base on [Ionic Framework v3](http://ionicframework.com/)



[中文文档](README.md)



# Example

[Download Link](http://a.app.qq.com/o/simple.jsp?pkgname=me.growu.drip)

![二维码](qrcode.png)



# Usage


```bash
git clone https://github.com/growu/drip-ionic3

cd drip-ionic3

npm install

ionic cordova platform add ios

ionic cordova platform add android

ionic cordova run ios

ionic cordova run ios
```

# Notice

1. ionic2-super-tabs issue

   you should manually copy https://raw.githubusercontent.com/zyra/ionic2-super-tabs/master/src/components/super-tabs.scss to *node_modules/ionic2-super-tabs/dist/components*

   ​


2. app-scripts 3.19.2 AOT issue [Detail](https://github.com/ionic-team/ionic-cli/issues/2889)

   ​

   modify `node_modules/@ionic/app-scripts/dist/logger/logger-typescript.js` line 29

   change：

   ```if (tsDiagnostic.file) {```

   to：

   ```if (tsDiagnostic.file && tsDiagnostic.file.getText) {```

# Relation

Ionic v1 version：[drip-ionic](https://github.com/growu/drip-ionic)
admin and api：[drip-website](https://github.com/growu/drip-website)

# About

website：[http://drip.growu.me](http://drip.growu.me)

wechat ：growuu

weibo：[格吾社区](http://weibo.com/growu)

# Feedback

qq群：783459080

[![ionic付费问答群](https://pub.idqqimg.com/wpa/images/group.png)](https://shang.qq.com/wpa/qunwpa?idkey=26fee235eae2460a35007c9790b5661b0a97033c948550fe06936a2cbbda009b)

# Donate

If this project help you reduce time to develop, you can give me a cup of coffee :)



[![paypal](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://www.paypal.me/jasonz1987/6.66)

# License

GPLv3




