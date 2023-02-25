import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { EmployeeLeaveAccountComponent } from './list/employee-leave-account.component';
import { EmployeeLeaveAccountDetailComponent } from './detail/employee-leave-account-detail.component';
import { EmployeeLeaveAccountUpdateComponent } from './update/employee-leave-account-update.component';
import { EmployeeLeaveAccountDeleteDialogComponent } from './delete/employee-leave-account-delete-dialog.component';
import { EmployeeLeaveAccountRoutingModule } from './route/employee-leave-account-routing.module';

@NgModule({
  imports: [SharedModule, EmployeeLeaveAccountRoutingModule],
  declarations: [
    EmployeeLeaveAccountComponent,
    EmployeeLeaveAccountDetailComponent,
    EmployeeLeaveAccountUpdateComponent,
    EmployeeLeaveAccountDeleteDialogComponent,
  ],
})
export class EmployeeLeaveAccountModule {}
