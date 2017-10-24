/**
 * @author：Jason.z
 * @email：ccnuzxg@163.com
 * @website：http://www.jason-z.com
 * @date：2017/9/28
 * @version 1.0
 */
import {Provider} from "@angular/core/core";
import {Platform} from "ionic-angular";
import {Crop} from '@ionic-native/crop';
import {CropMock} from '@ionic-native-mocks/crop';
import {File} from '@ionic-native/file';
import {FileMock} from '@ionic-native-mocks/file';
import {FileTransfer} from '@ionic-native/file-transfer';
import {FileTransferMock} from '@ionic-native-mocks/file-transfer';
import {ImagePicker} from '@ionic-native/image-picker';
import {ImagePickerMock} from '@ionic-native-mocks/image-picker';
import {AppRate} from '@ionic-native/app-rate';
import {AppRateMock} from '@ionic-native-mocks/app-rate';

    export class AppProvider {

    public static getCropProvider(): Provider {
        return {
            provide: Crop, useFactory: (platform: Platform) => {
                if (this.deviceRunningCordova(platform)) {
                    return new Crop();
                } else {
                    return new CropMock();
                }
            }, deps: [Platform]
        };
    }

    public static getFileProvider(): Provider {
        return {
            provide: File, useFactory: (platform: Platform) => {
                if (this.deviceRunningCordova(platform)) {
                    return new File();
                } else {
                    return new FileMock();
                }
            }, deps: [Platform]
        };
    }

    public static getFileTransferProvider(): Provider {
        return {
            provide: FileTransfer, useFactory: (platform: Platform) => {
                if (this.deviceRunningCordova(platform)) {
                    return new FileTransfer();
                } else {
                    return new FileTransferMock();
                }
            }, deps: [Platform]
        };
    }

    public static getImagePickerProvider(): Provider {
        return {
            provide: ImagePicker, useFactory: (platform: Platform) => {
                if (this.deviceRunningCordova(platform)) {
                    return new ImagePicker();
                } else {
                    return new ImagePickerMock();
                }
            }, deps: [Platform]
        };
    }

    public static getAppRateProvider(): Provider {
        return {
            provide: AppRate, useFactory: (platform: Platform) => {
                if (this.deviceRunningCordova(platform)) {
                    return new AppRate();
                } else {
                    return new AppRateMock();
                }
            }, deps: [Platform]
        };
    }

    private static deviceRunningCordova(platform: Platform): boolean {
        return platform.is('cordova');
    }
}