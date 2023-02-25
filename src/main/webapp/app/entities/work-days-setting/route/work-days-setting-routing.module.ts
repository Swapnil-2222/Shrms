import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { WorkDaysSettingComponent } from '../list/work-days-setting.component';
import { WorkDaysSettingDetailComponent } from '../detail/work-days-setting-detail.component';
import { WorkDaysSettingUpdateComponent } from '../update/work-days-setting-update.component';
import { WorkDaysSettingRoutingResolveService } from './work-days-setting-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const workDaysSettingRoute: Routes = [
  {
    path: '',
    component: WorkDaysSettingComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: WorkDaysSettingDetailComponent,
    resolve: {
      workDaysSetting: WorkDaysSettingRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: WorkDaysSettingUpdateComponent,
    resolve: {
      workDaysSetting: WorkDaysSettingRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: WorkDaysSettingUpdateComponent,
    resolve: {
      workDaysSetting: WorkDaysSettingRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(workDaysSettingRoute)],
  exports: [RouterModule],
})
export class WorkDaysSettingRoutingModule {}
