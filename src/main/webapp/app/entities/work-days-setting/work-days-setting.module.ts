import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { WorkDaysSettingComponent } from './list/work-days-setting.component';
import { WorkDaysSettingDetailComponent } from './detail/work-days-setting-detail.component';
import { WorkDaysSettingUpdateComponent } from './update/work-days-setting-update.component';
import { WorkDaysSettingDeleteDialogComponent } from './delete/work-days-setting-delete-dialog.component';
import { WorkDaysSettingRoutingModule } from './route/work-days-setting-routing.module';

@NgModule({
  imports: [SharedModule, WorkDaysSettingRoutingModule],
  declarations: [
    WorkDaysSettingComponent,
    WorkDaysSettingDetailComponent,
    WorkDaysSettingUpdateComponent,
    WorkDaysSettingDeleteDialogComponent,
  ],
})
export class WorkDaysSettingModule {}
