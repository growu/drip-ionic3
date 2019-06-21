import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {UserSearchPage} from './user-search';
import {DpFollowButtonComponentModule} from "../../components/dp-follow-button/dp-follow-button.module";

@NgModule({
    declarations: [
        UserSearchPage,
    ],
    imports: [
        IonicPageModule.forChild(UserSearchPage),
        DpFollowButtonComponentModule
    ],
})
export class UserSearchPageModule {
}
