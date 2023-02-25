import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IApprovalLevel } from '../approval-level.model';
import { ApprovalLevelService } from '../service/approval-level.service';

@Injectable({ providedIn: 'root' })
export class ApprovalLevelRoutingResolveService implements Resolve<IApprovalLevel | null> {
  constructor(protected service: ApprovalLevelService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IApprovalLevel | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((approvalLevel: HttpResponse<IApprovalLevel>) => {
          if (approvalLevel.body) {
            return of(approvalLevel.body);
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
