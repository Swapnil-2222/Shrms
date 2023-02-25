import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { EmployeeLeaveAccountComponent } from '../list/employee-leave-account.component';
import { EmployeeLeaveAccountDetailComponent } from '../detail/employee-leave-account-detail.component';
import { EmployeeLeaveAccountUpdateComponent } from '../update/employee-leave-account-update.component';
import { EmployeeLeaveAccountRoutingResolveService } from './employee-leave-account-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const employeeLeaveAccountRoute: Routes = [
  {
    path: '',
    component: EmployeeLeaveAccountComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: EmployeeLeaveAccountDetailComponent,
    resolve: {
      employeeLeaveAccount: EmployeeLeaveAccountRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: EmployeeLeaveAccountUpdateComponent,
    resolve: {
      employeeLeaveAccount: EmployeeLeaveAccountRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: EmployeeLeaveAccountUpdateComponent,
    resolve: {
      employeeLeaveAccount: EmployeeLeaveAccountRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(employeeLeaveAccountRoute)],
  exports: [RouterModule],
})
export class EmployeeLeaveAccountRoutingModule {}
