import {ChangeDetectorRef, Component, ElementRef, Input, Renderer2} from '@angular/core';
import {ActionSheetController, App} from 'ionic-angular';
import {EventProvider} from '../../providers/event/event'
import {MyShareController} from "../my-share/my-share.controller";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
    selector: 'my-event',
    templateUrl: 'my-event.html',
})
export class MyEventComponent {

    // public events:any = [];
    @Input() _eventSource: any = [];

    constructor(public actionSheetCtrl: ActionSheetController,
                private myShareCtrl: MyShareController,
                private app: App,
                private elRef: ElementRef,
                private cdRef: ChangeDetectorRef,
                private renderer: Renderer2,
                private sanitizer: DomSanitizer,
                private eventProvider: EventProvider) {

    }

    ionViewDidLoad() {
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

    goEventDetailPage(id) {
        this.app.getRootNav().push('event-detail', {id: id});
    }

    goUserHomePage(user) {
        this.app.getRootNav().push('user-home', {id: user.id});
    }

    // goTopicPage(topic) {
    //     alert(topic);
    //     // this.app.getRootNav().push('user-home', {id: user.id});
    // }

    formatContent(event) {
        var content = event.content;

        // 替换网址
        var linkPattern = /\b((http:\/\/|https:\/\/|ftp:\/\/|mailto:|news:)|www\.|ftp\.|[^ \,\;\:\!\)\(\""\'<>\f\n\r\t\v]+@)([^ \,\;\:\!\)\(\""\'<>\f\n\r\t\v]+)\b/gim;
        content = content.replace(linkPattern, function ($0, $1) {
            var match = $0;
            return "<a href='" + match + "' target='_blank' onclick='event.stopPropagation();'  class='share-content-link' ><i class='ion-link'></i>网页链接</a>";
        });

        // // 替换话题
        // var topicPattern = /\#([^\#|.]+)\#/g;
        // content = content.replace(topicPattern, function ($0, $1) {
        //     var match = $0;
        //     var protocol = $1;
        //     return '<a class="event-content-topic" data-topic="'+protocol+'">'+match+'</a>';
        // });
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

        return content;
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

        // var eventTopicDom =  this.elRef.nativeElement.querySelector('a.event-content-topic');
        //
        // if(eventTopicDom) {
        //     this.renderer.listen(eventTopicDom, 'click', (event) => {
        //         event.preventDefault();
        //         event.stopPropagation();
        //         var topic = eventTopicDom.getAttribute('data-topic');
        //         if(topic) {
        //             this.goTopicPage(topic);
        //         }
        //     });
        // }

        // var eventAtDom =  this.elRef.nativeElement.querySelector('a.event-content-at');
        //
        // if(eventAtDom) {
        //     this.renderer.listen(eventAtDom, 'click', (event) => {
        //         event.preventDefault();
        //         event.stopPropagation();
        //         var user = eventTopicDom.getAttribute('data-user');
        //         if(user) {
        //             this.goUserHomePage(user);
        //         }
        //     });
        // }

        // var eventContentDom =  this.elRef.nativeElement.querySelector('a.event-content-full');
        //
        // eventContentDom.addEventListener('click',(evt)=>{
        //     alert(1);
        //     var event = eventContentDom.getAttribute('data-event');
        //     this.showFull(evt,event);
        // });

        // this.elRef.nativeElement.querySelector('a.event-content-full').addEventListener('click', this.showFull.bind(this));
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