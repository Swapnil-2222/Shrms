import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { TdsComponent } from '../list/tds.component';
import { TdsDetailComponent } from '../detail/tds-detail.component';
import { TdsUpdateComponent } from '../update/tds-update.component';
import { TdsRoutingResolveService } from './tds-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const tdsRoute: Routes = [
  {
    path: '',
    component: TdsComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: TdsDetailComponent,
    resolve: {
      tds: TdsRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: TdsUpdateComponent,
    resolve: {
      tds: TdsRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: TdsUpdateComponent,
    resolve: {
      tds: TdsRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(tdsRoute)],
  exports: [RouterModule],
})
export class TdsRoutingModule {}
