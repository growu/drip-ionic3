/**
 * @author：Jason.z
 * @email：ccnuzxg@163.com
 * @website：http://www.jason-z.com
 * @date：2017/9/12
 * @version 1.0
 */

import { HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import * as Hammer from 'hammerjs';

// create a class that overrides hammer default config

export class DpHammerConfig extends HammerGestureConfig  {
    overrides = <any>{
        'swipe': { direction: Hammer.DIRECTION_ALL } // override default settings
    }
}