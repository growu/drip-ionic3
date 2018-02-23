# 关于项目

水滴打卡是一款帮助用户进行习惯养成和目标管理的App。该项目基于[Ionic Framework v3](http://ionicframework.com/)版本创建。

# 如何使用


```bash
npm install
```

```bash
ionic cordova platform add ios
```

```bash
ionic cordova platform add android
```

# 注意事项

由于ionic2-super-tabs插件的问题

需要手动复制文件https://raw.githubusercontent.com/zyra/ionic2-super-tabs/master/src/components/super-tabs.scss
到*node_modules/ionic2-super-tabs/dist/components*下

由于app-scripts3.19.2版本在AOT环境下编译会报错[ISSUES](https://github.com/ionic-team/ionic-cli/issues/2889)

需要修改 node_modules/@ionic/app-scripts/dist/logger/logger-typescript.js的29行

原来：

```if (tsDiagnostic.file) {```

修改为：

```if (tsDiagnostic.file && tsDiagnostic.file.getText) {```

# ionic v1

ionic v1版本的源码可以参考[drip-ionic](https://github.com/growu/drip-ionic)

# 后台API接口

后台API暂未整理，源码可参考[drip-website](https://github.com/growu/drip-website)

# 下载体验

 AppStore:[已上架](https://itunes.apple.com/cn/app/id1255579223)

 国内安卓各大市场，搜索"水滴打卡"即可。

# 关于我们

官网：[http://drip.growu.me](http://drip.growu.me)

微信公众号：格吾社区（growuu）

新浪微博：[格吾社区](http://weibo.com/growu)

# 问题反馈

有任何使用上遇到的BUG或者优化建议，都可以提交[Issues](https://github.com/growu/drip-ionic3/issues),也可以加入我们的产品交流群反馈。

QQ群：7852084

微信群：添加格吾君微信（微信号：growu001）,发送暗号"水滴打卡"

# License

本APP遵循GPLv3协议，源代码仅供参考学习，请勿用作商业用途。




