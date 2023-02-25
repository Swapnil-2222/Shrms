import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { CustomApprovarComponent } from '../list/custom-approvar.component';
import { CustomApprovarDetailComponent } from '../detail/custom-approvar-detail.component';
import { CustomApprovarUpdateComponent } from '../update/custom-approvar-update.component';
import { CustomApprovarRoutingResolveService } from './custom-approvar-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const customApprovarRoute: Routes = [
  {
    path: '',
    component: CustomApprovarComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: CustomApprovarDetailComponent,
    resolve: {
      customApprovar: CustomApprovarRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: CustomApprovarUpdateComponent,
    resolve: {
      customApprovar: CustomApprovarRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: CustomApprovarUpdateComponent,
    resolve: {
      customApprovar: CustomApprovarRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(customApprovarRoute)],
  exports: [RouterModule],
})
export class CustomApprovarRoutingModule {}
