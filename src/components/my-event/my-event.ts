import {
    ApplicationRef,
    ChangeDetectorRef, Component, ComponentRef, ElementRef, Injector, Input, NgModule, ReflectiveInjector, Renderer2,
    ViewChild,
    ViewContainerRef
} from '@angular/core';
import {ActionSheetController, App, NavController, NavParams} from 'ionic-angular';
import {EventProvider} from '../../providers/event/event'
import {MyShareController} from "../my-share/my-share.controller";
import {DomSanitizer} from "@angular/platform-browser";
// import { ComponentFactoryResolver } from '@angular/core';
// import { MyInterLinkComponent } from '../my-inter-link/my-inter-link';
// import { InterLinkDirective } from '../../directives/inter-link.directive';
import {InAppBrowser} from '@ionic-native/in-app-browser';


@Component({
    selector: 'my-event',
    templateUrl: 'my-event.html',
    // entryComponents:[MyInterLinkComponent]
})

// @NgModule({
//     imports: [
//         DynamicModule.withComponents([MyInterLinkComponent])
//     ]
// })

export class MyEventComponent {

    @Input() _eventSource: any = [];
    // component: ComponentRef<MyInterLinkComponent>;
    // @ViewChild(InterLinkDirective) interLink: InterLinkDirective;

    @Input() inputs: any;

    constructor(public actionSheetCtrl: ActionSheetController,
                private myShareCtrl: MyShareController,
                private navCtrl: NavController,
                private navParams: NavParams,
                private app: App,
                private iab: InAppBrowser,
                private sanitizer: DomSanitizer,
                // private componentFactoryResolver: ComponentFactoryResolver,
                private injector: Injector,
                // private viewContainerRef:ViewContainerRef,
                private appRef: ApplicationRef,
                private eventProvider: EventProvider) {

        // this.component = this.componentFactoryResolver
        //     .resolveComponentFactory(MyInterLinkComponent)
        //     .create(this.injector);
        // appRef.attachView(this.component.hostView);

    }

    ionViewDidLoad() {

    }

    loadComponent() {
        // this.component = this.componentFactoryResolver
        //     .resolveComponentFactory(MyInterLinkComponent)
        //     .create(this.injector);
        // (<MyInterLinkComponent>this.component.instance).content = "home";

        //     let componentFactory = this.componentFactoryResolver.resolveComponentFactory(MyInterLinkComponent);
        // let viewContainerRef = this.interLink.viewContainerRef;
        // viewContainerRef.clear();
        //
        // let componentRef = viewContainerRef.createComponent(componentFactory);
        // (<MyInterLinkComponent>componentRef.instance).page = '';
    }

    @Input()
    set eventSource(value: any) {
        this._eventSource = value;
    }


    doLike(event, $event) {

        let index = this._eventSource.indexOf(event);

        if (event.is_like) {
            this.eventProvider.unLike(event.id).then((data) => {
                this._eventSource[index].is_like = false;
                this._eventSource[index].like_count -= 1;
            }).catch((err) => {

            });
        } else {
            this.eventProvider.like(event.id).then((data) => {
                this._eventSource[index].is_like = true;
                this._eventSource[index].like_count += 1;
            }).catch((err) => {

            });
        }
    }

    showMore(event) {
        let actionSheet = this.actionSheetCtrl.create({
            title: '更多',
            buttons: [
                {
                    text: '分享',
                    role: 'destructive',
                    handler: () => {
                        console.log(event.attachs);

                        // let image = 'https://source.unsplash.com/random/400/300';
                        let image = null;
                        if (event.attachs.length > 0) {
                            let attach = event.attachs[0];
                            if (attach.url) {
                                image = attach.url;
                            }
                        }

                        let myShare = this.myShareCtrl.create({
                                data: {
                                    type: 'url',
                                    title: event.user.nickname + " 的打卡动态",
                                    description: event.content,
                                    image: image,
                                    thumb: image,
                                    url: "http://drip.growu.me"
                                },
                                extra: event
                            })
                        ;
                        myShare.present();
                    }
                }, {
                    text: '举报',
                    handler: () => {
                        console.log('Archive clicked');
                    }
                }, {
                    text: '取消',
                    role: 'cancel',
                    handler: () => {
                        console.log('Cancel clicked');
                    }
                }
            ]
        });
        actionSheet.present();
    }

    goEventDetailPage(id, e) {
        e = e || window.event; //兼容IE8
        let target = e.target || e.srcElement;  //判断目标事件
        console.log(e);
        console.log(target.className.indexOf('event-content-topic'));

        if (target.className.indexOf('event-content-topic') != -1) {
            let name = target.getAttribute("data-name");
            if (name) {
                this.app.getRootNav().push('topic', {name: name});
            }
        } else if (target.className.indexOf('event-content-link') != -1) {
            let url = target.getAttribute("data-url");
            if (url) {
                this.iab.create(url, '_blank', 'toolbar=yes');
            }
        } else {
            this.app.getRootNav().push('event-detail', {id: id});
        }

    }


    formatContent(event) {
        var content = event.content;

        // 替换网址
        var linkPattern = /\b((http:\/\/|https:\/\/|ftp:\/\/|mailto:|news:)|www\.|ftp\.|[^ \,\;\:\!\)\(\""\'<>\f\n\r\t\v]+@)([^ \,\;\:\!\)\(\""\'<>\f\n\r\t\v]+)\b/gim;
        content = content.replace(linkPattern, function ($0, $1) {
            var match = $0;
            return '<a data-url="' + match + '" class="event-content-link"><i class="ion-link"></i>网页链接</a> ';
        });

        // 替换话题
        var topicPattern = /\#([^\#|.]+)\#/g;
        content = content.replace(topicPattern, function ($0, $1) {
            var match = $0;
            var protocol = $1;
            // let inputs = {
            //     page: 'topic',
            //     params: {
            //         name: match
            //     }
            // };
            // return '<ng-container *ngComponentOutlet="MyInterLinkComponent"></ng-container>';
            // return '<ng-template inter-link></ng-template>';
            // return '<ndc-dynamic [ndcDynamicComponent]="MyInterLinkComponent"  [ndcDynamicInputs]="'+inputs+'"></ndc-dynamic>';
            var str = '<a data-name="' + protocol + '"  class="event-content-topic" >' + match + '</a>';
            return str;
        });
        //
        // // 替换@
        // var atPattern = /\@([^\@|.|<|,|:|：|^ ]+)/g;
        // // var atPattern = /\@([^<,，：:\s@]+)/g;
        //
        // content = content.replace(atPattern, function ($0, $1) {
        //     var match = $0;
        //     var protocol = $1;
        //     return "<a class='event-content-at' (click)='goUserHomePage("+protocol+")'>"+match+"</a>";
        // });

        // 切割content 长度
        if (content.length > 100) {
            if (event.is_full_content) {
                return content;
            } else {
                return this.transform(this.substrWithTags(content, 0, 100));
            }
        }

        // return content;

        return this.transform(content);
    }

    substrWithTags(str, start, length) {
        var countTags = 0;
        var returnString = "";
        var writeLetters = 0;
        while (!((writeLetters >= length) && (countTags == 0))) {
            var letter = str.charAt(start + writeLetters);
            if (letter == "<") {
                countTags++;
            }
            if (letter == ">") {
                countTags--;
            }
            returnString += letter;
            writeLetters++;
        }
        return returnString;
    }

    transform(content) {
        return this.sanitizer.bypassSecurityTrustHtml(content);
    }

    ngAfterViewInit() {
        // this.loadComponent();
    }

    ngOnDestroy() {
        // if(this.component) {
        //     this.appRef.detachView(this.component.hostView);
        //     this.component.destroy();
        // }
    }

    goUserHomePage() {
    }

    showFull($event, event) {
        $event.preventDefault();
        $event.stopPropagation();
        let index = this._eventSource.indexOf(event);
        (this._eventSource[index])["is_full_content"] = true;
    }

    showHide($event, event) {
        $event.preventDefault();
        $event.stopPropagation();
        let index = this._eventSource.indexOf(event);
        (this._eventSource[index])["is_full_content"] = false;
    }
}