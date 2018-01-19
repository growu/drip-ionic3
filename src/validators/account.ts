/**
 * @author：Jason.z
 * @email：ccnuzxg@163.com
 * @website：http://www.jason-z.com
 * @date：2017/9/17
 * @version 1.0
 */

import {FormControl} from '@angular/forms';

export class AccountValidator {

    static isValid(control: FormControl){
        
        if (control.value.match(/^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/)) {
            return null;
        }

        if (control.value.match(/^1[3|4|5|7|8][0-9]{9}$/)) {
            return null;

        }

        return { invalidAccount: true };
    }

    static isValidPhone(control: FormControl){

        if (control.value.match(/^1[3|4|5|7|8][0-9]{9}$/)) {
            return null;
        }

        return { invalidAccount: true };
    }

    static isValidEmail(control: FormControl){

        if (control.value.match(/^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/)) {
            return null;
        }

        return { invalidAccount: true };
    }

}