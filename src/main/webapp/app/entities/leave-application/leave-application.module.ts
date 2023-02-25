import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { LeaveApplicationComponent } from './list/leave-application.component';
import { LeaveApplicationDetailComponent } from './detail/leave-application-detail.component';
import { LeaveApplicationUpdateComponent } from './update/leave-application-update.component';
import { LeaveApplicationDeleteDialogComponent } from './delete/leave-application-delete-dialog.component';
import { LeaveApplicationRoutingModule } from './route/leave-application-routing.module';

@NgModule({
  imports: [SharedModule, LeaveApplicationRoutingModule],
  declarations: [
    LeaveApplicationComponent,
    LeaveApplicationDetailComponent,
    LeaveApplicationUpdateComponent,
    LeaveApplicationDeleteDialogComponent,
  ],
})
export class LeaveApplicationModule {}
