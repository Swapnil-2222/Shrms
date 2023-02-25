import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IHoliday } from '../holiday.model';
import { HolidayService } from '../service/holiday.service';

@Injectable({ providedIn: 'root' })
export class HolidayRoutingResolveService implements Resolve<IHoliday | null> {
  constructor(protected service: HolidayService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IHoliday | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((holiday: HttpResponse<IHoliday>) => {
          if (holiday.body) {
            return of(holiday.body);
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
