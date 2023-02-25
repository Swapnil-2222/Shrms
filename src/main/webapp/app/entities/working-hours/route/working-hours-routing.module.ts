import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { WorkingHoursComponent } from '../list/working-hours.component';
import { WorkingHoursDetailComponent } from '../detail/working-hours-detail.component';
import { WorkingHoursUpdateComponent } from '../update/working-hours-update.component';
import { WorkingHoursRoutingResolveService } from './working-hours-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const workingHoursRoute: Routes = [
  {
    path: '',
    component: WorkingHoursComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: WorkingHoursDetailComponent,
    resolve: {
      workingHours: WorkingHoursRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: WorkingHoursUpdateComponent,
    resolve: {
      workingHours: WorkingHoursRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: WorkingHoursUpdateComponent,
    resolve: {
      workingHours: WorkingHoursRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(workingHoursRoute)],
  exports: [RouterModule],
})
export class WorkingHoursRoutingModule {}
