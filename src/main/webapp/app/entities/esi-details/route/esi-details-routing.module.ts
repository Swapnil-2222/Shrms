import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { EsiDetailsComponent } from '../list/esi-details.component';
import { EsiDetailsDetailComponent } from '../detail/esi-details-detail.component';
import { EsiDetailsUpdateComponent } from '../update/esi-details-update.component';
import { EsiDetailsRoutingResolveService } from './esi-details-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const esiDetailsRoute: Routes = [
  {
    path: '',
    component: EsiDetailsComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: EsiDetailsDetailComponent,
    resolve: {
      esiDetails: EsiDetailsRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: EsiDetailsUpdateComponent,
    resolve: {
      esiDetails: EsiDetailsRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: EsiDetailsUpdateComponent,
    resolve: {
      esiDetails: EsiDetailsRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(esiDetailsRoute)],
  exports: [RouterModule],
})
export class EsiDetailsRoutingModule {}
