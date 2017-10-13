/**
 * @author：Jason.z
 * @email：ccnuzxg@163.com
 * @website：http://www.jason-z.com
 * @date：2017/10/12
 * @version 1.0
 */

import { FormControl } from '@angular/forms';

export class EqualValidator {
    static isEqual(control: FormControl) {

        if (control.value == control.root.value['new_password']) {
            console.log('passwords  match');
            return null;
        } else {
            return { isEqual: true };
        }
    }
}