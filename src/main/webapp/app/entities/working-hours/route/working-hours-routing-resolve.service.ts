import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IWorkingHours } from '../working-hours.model';
import { WorkingHoursService } from '../service/working-hours.service';

@Injectable({ providedIn: 'root' })
export class WorkingHoursRoutingResolveService implements Resolve<IWorkingHours | null> {
  constructor(protected service: WorkingHoursService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IWorkingHours | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((workingHours: HttpResponse<IWorkingHours>) => {
          if (workingHours.body) {
            return of(workingHours.body);
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
