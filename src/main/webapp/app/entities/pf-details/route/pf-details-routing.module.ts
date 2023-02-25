import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { PfDetailsComponent } from '../list/pf-details.component';
import { PfDetailsDetailComponent } from '../detail/pf-details-detail.component';
import { PfDetailsUpdateComponent } from '../update/pf-details-update.component';
import { PfDetailsRoutingResolveService } from './pf-details-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const pfDetailsRoute: Routes = [
  {
    path: '',
    component: PfDetailsComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: PfDetailsDetailComponent,
    resolve: {
      pfDetails: PfDetailsRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: PfDetailsUpdateComponent,
    resolve: {
      pfDetails: PfDetailsRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: PfDetailsUpdateComponent,
    resolve: {
      pfDetails: PfDetailsRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(pfDetailsRoute)],
  exports: [RouterModule],
})
export class PfDetailsRoutingModule {}
