import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ApprovalSettingComponent } from '../list/approval-setting.component';
import { ApprovalSettingDetailComponent } from '../detail/approval-setting-detail.component';
import { ApprovalSettingUpdateComponent } from '../update/approval-setting-update.component';
import { ApprovalSettingRoutingResolveService } from './approval-setting-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const approvalSettingRoute: Routes = [
  {
    path: '',
    component: ApprovalSettingComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ApprovalSettingDetailComponent,
    resolve: {
      approvalSetting: ApprovalSettingRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ApprovalSettingUpdateComponent,
    resolve: {
      approvalSetting: ApprovalSettingRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ApprovalSettingUpdateComponent,
    resolve: {
      approvalSetting: ApprovalSettingRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(approvalSettingRoute)],
  exports: [RouterModule],
})
export class ApprovalSettingRoutingModule {}
