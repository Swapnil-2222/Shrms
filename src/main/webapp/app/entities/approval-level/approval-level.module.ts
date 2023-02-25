import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { ApprovalLevelComponent } from './list/approval-level.component';
import { ApprovalLevelDetailComponent } from './detail/approval-level-detail.component';
import { ApprovalLevelUpdateComponent } from './update/approval-level-update.component';
import { ApprovalLevelDeleteDialogComponent } from './delete/approval-level-delete-dialog.component';
import { ApprovalLevelRoutingModule } from './route/approval-level-routing.module';

@NgModule({
  imports: [SharedModule, ApprovalLevelRoutingModule],
  declarations: [ApprovalLevelComponent, ApprovalLevelDetailComponent, ApprovalLevelUpdateComponent, ApprovalLevelDeleteDialogComponent],
})
export class ApprovalLevelModule {}
