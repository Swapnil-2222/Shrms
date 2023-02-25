import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IEmployeeLeaveAccount } from '../employee-leave-account.model';
import { EmployeeLeaveAccountService } from '../service/employee-leave-account.service';

@Injectable({ providedIn: 'root' })
export class EmployeeLeaveAccountRoutingResolveService implements Resolve<IEmployeeLeaveAccount | null> {
  constructor(protected service: EmployeeLeaveAccountService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IEmployeeLeaveAccount | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((employeeLeaveAccount: HttpResponse<IEmployeeLeaveAccount>) => {
          if (employeeLeaveAccount.body) {
            return of(employeeLeaveAccount.body);
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
