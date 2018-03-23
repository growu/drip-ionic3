import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, Platform} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserProvider} from "../../providers/user/user";
import {ToastProvider} from "../../providers/toast/toast";
import swal from 'sweetalert2'
import {Device} from '@ionic-native/device';
import {ToolProvider} from "../../providers/tool/tool";

declare var chcp;

@IonicPage({
    name: 'feedback'
})
@Component({
    selector: 'page-feedback',
    templateUrl: 'feedback.html',
})
export class FeedbackPage {

    private feedbackForm: FormGroup;
    private appVersion: string;
    private webVersion: string;
    private attach: any;

    constructor(public navCtrl: NavController,
                private formBuilder: FormBuilder,
                private toastProvider: ToastProvider,
                private device: Device,
                private platform: Platform,
                private userProvider: UserProvider,
                private toolProvider: ToolProvider,
                public navParams: NavParams) {
        this.feedbackForm = this.formBuilder.group({
            'type': ['', [Validators.required,]],
            'content': ['', [Validators.required,]],
            'contact': ['', []]
        });
        this.feedbackForm.get('type').setValue(1);

    }

    ionViewDidLoad() {
        if (this.platform.is('cordova')) {
            chcp.getVersionInfo((err, data) => {
                this.appVersion = data.appVersion;
                this.webVersion = data.currentWebVersion;
            });
        }
    }

    doFeedback() {
        if (!this.feedbackForm.valid) {
            if (!this.feedbackForm.controls.content.valid) {
                this.toastProvider.show("请输入反馈内容", "error");
                return;
            }
        }

        let device;

        if (this.platform.is('cordova')) {
            device = {
                cordova: this.device.cordova,
                model: this.device.model,
                platform: this.device.platform,
                uuid: this.device.uuid,
                version: this.device.version,
                manufacturer: this.device.manufacturer,
                isVirtual: this.device.isVirtual,
                serial: this.device.serial,
            };
        } else {
            device = {};
        }

        let body = this.feedbackForm.value;
        body['device'] = device;
        body['app_version'] = this.appVersion;
        body['web_version'] = this.webVersion;

        this.userProvider.feedback(body).then(data => {
            if (data) {
                this.toastProvider.show("感谢反馈",'success');
                // swal({
                //     title: '感谢反馈',
                //     text: '你的反馈已经收到，我们将尽快确认。你也可以添加客服微信(微信号：growu001）,加入产品群实时交流。',
                //     type: 'success',
                //     showConfirmButton: false,
                //     width: '80%'
                // }).then(() => {
                // }, dismiss => {
                // });
            }
        }).catch((err) => {

        });
    }

    choosePic($event) {
        this.toolProvider.choosePic($event).then((ret) => {
            if (ret) {
                this.attach = ret;
            }
        }).catch((err) => {

        });
    }

    removeAttach($event) {
        $event.preventDefault();
        this.attach = null;
    }
}
