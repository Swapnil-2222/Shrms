import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ICustomLeavePolicy } from '../custom-leave-policy.model';
import { CustomLeavePolicyService } from '../service/custom-leave-policy.service';

@Injectable({ providedIn: 'root' })
export class CustomLeavePolicyRoutingResolveService implements Resolve<ICustomLeavePolicy | null> {
  constructor(protected service: CustomLeavePolicyService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICustomLeavePolicy | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((customLeavePolicy: HttpResponse<ICustomLeavePolicy>) => {
          if (customLeavePolicy.body) {
            return of(customLeavePolicy.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(null);
  }
}
