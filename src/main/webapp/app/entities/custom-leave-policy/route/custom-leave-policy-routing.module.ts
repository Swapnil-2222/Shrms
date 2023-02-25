import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { CustomLeavePolicyComponent } from '../list/custom-leave-policy.component';
import { CustomLeavePolicyDetailComponent } from '../detail/custom-leave-policy-detail.component';
import { CustomLeavePolicyUpdateComponent } from '../update/custom-leave-policy-update.component';
import { CustomLeavePolicyRoutingResolveService } from './custom-leave-policy-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const customLeavePolicyRoute: Routes = [
  {
    path: '',
    component: CustomLeavePolicyComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: CustomLeavePolicyDetailComponent,
    resolve: {
      customLeavePolicy: CustomLeavePolicyRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: CustomLeavePolicyUpdateComponent,
    resolve: {
      customLeavePolicy: CustomLeavePolicyRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: CustomLeavePolicyUpdateComponent,
    resolve: {
      customLeavePolicy: CustomLeavePolicyRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(customLeavePolicyRoute)],
  exports: [RouterModule],
})
export class CustomLeavePolicyRoutingModule {}
