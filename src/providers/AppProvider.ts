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
import {KeyboardMock} from '@ionic-native-mocks/keyboard';
import {Keyboard} from '@ionic-native/keyboard';

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

export function ImagePickerFactory() {
    return (window.hasOwnProperty('cordova')) ? new ImagePicker() : new ImagePickerMock();
};

export const ImagePickerProvider = {
        provide: ImagePicker,
        useFactory: ImagePickerFactory
};

export function FileFactory():any {
    return (window.hasOwnProperty('cordova')) ? new File() : new FileMock();
};

export const FileProvider = {
    provide: File,
    useFactory: FileFactory
};

export function FileTransferFactory():any {
    return (window.hasOwnProperty('cordova')) ? new FileTransfer() : new FileTransferMock();
};

export const FileTransferProvider = {
    provide: FileTransfer,
    useFactory: FileTransferFactory
};

export function CropFactory():any {
    return (window.hasOwnProperty('cordova')) ? new Crop() : new CropMock();
};

export const CropProvider = {
    provide: Crop,
    useFactory: CropFactory
};

export function AppRateFactory():any {
    return (window.hasOwnProperty('cordova')) ? new AppRate() : new AppRateMock();
}

export const AppRateProvider = {
    provide: AppRate,
    useFactory: AppRateFactory
};


export function KeyboardFactory():any {
    return (window.hasOwnProperty('cordova')) ? new Keyboard() : new KeyboardMock();
}

export const KeyboardProvider = {
    provide: Keyboard,
    useFactory: KeyboardFactory
};


