import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { ApprovalSettingComponent } from './list/approval-setting.component';
import { ApprovalSettingDetailComponent } from './detail/approval-setting-detail.component';
import { ApprovalSettingUpdateComponent } from './update/approval-setting-update.component';
import { ApprovalSettingDeleteDialogComponent } from './delete/approval-setting-delete-dialog.component';
import { ApprovalSettingRoutingModule } from './route/approval-setting-routing.module';

@NgModule({
  imports: [SharedModule, ApprovalSettingRoutingModule],
  declarations: [
    ApprovalSettingComponent,
    ApprovalSettingDetailComponent,
    ApprovalSettingUpdateComponent,
    ApprovalSettingDeleteDialogComponent,
  ],
})
export class ApprovalSettingModule {}
