import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ApprovalLevelComponent } from '../list/approval-level.component';
import { ApprovalLevelDetailComponent } from '../detail/approval-level-detail.component';
import { ApprovalLevelUpdateComponent } from '../update/approval-level-update.component';
import { ApprovalLevelRoutingResolveService } from './approval-level-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const approvalLevelRoute: Routes = [
  {
    path: '',
    component: ApprovalLevelComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ApprovalLevelDetailComponent,
    resolve: {
      approvalLevel: ApprovalLevelRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ApprovalLevelUpdateComponent,
    resolve: {
      approvalLevel: ApprovalLevelRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ApprovalLevelUpdateComponent,
    resolve: {
      approvalLevel: ApprovalLevelRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(approvalLevelRoute)],
  exports: [RouterModule],
})
export class ApprovalLevelRoutingModule {}
