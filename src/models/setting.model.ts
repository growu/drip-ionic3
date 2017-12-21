/**
 * @author：Jason.z
 * @email：ccnuzxg@163.com
 * @website：http://www.jason-z.com
 * @date：2017/9/15
 * @version 1.0
 */

// export type CalendarMode = 'month' | 'week';

// export type ViewMode = 'list' | 'card';

export interface SettingModel {
    viewMode: string;
    calendarMode: string;
    enableSort:boolean;
    hideExpireGoals:boolean;
}