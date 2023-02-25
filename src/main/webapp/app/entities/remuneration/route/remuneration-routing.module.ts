import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { RemunerationComponent } from '../list/remuneration.component';
import { RemunerationDetailComponent } from '../detail/remuneration-detail.component';
import { RemunerationUpdateComponent } from '../update/remuneration-update.component';
import { RemunerationRoutingResolveService } from './remuneration-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const remunerationRoute: Routes = [
  {
    path: '',
    component: RemunerationComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: RemunerationDetailComponent,
    resolve: {
      remuneration: RemunerationRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: RemunerationUpdateComponent,
    resolve: {
      remuneration: RemunerationRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: RemunerationUpdateComponent,
    resolve: {
      remuneration: RemunerationRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(remunerationRoute)],
  exports: [RouterModule],
})
export class RemunerationRoutingModule {}
