import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ITds } from '../tds.model';
import { TdsService } from '../service/tds.service';

@Injectable({ providedIn: 'root' })
export class TdsRoutingResolveService implements Resolve<ITds | null> {
  constructor(protected service: TdsService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ITds | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((tds: HttpResponse<ITds>) => {
          if (tds.body) {
            return of(tds.body);
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
