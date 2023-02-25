import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IWorkDaysSetting } from '../work-days-setting.model';
import { WorkDaysSettingService } from '../service/work-days-setting.service';

@Injectable({ providedIn: 'root' })
export class WorkDaysSettingRoutingResolveService implements Resolve<IWorkDaysSetting | null> {
  constructor(protected service: WorkDaysSettingService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IWorkDaysSetting | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((workDaysSetting: HttpResponse<IWorkDaysSetting>) => {
          if (workDaysSetting.body) {
            return of(workDaysSetting.body);
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
