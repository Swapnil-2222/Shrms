import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IPfDetails } from '../pf-details.model';
import { PfDetailsService } from '../service/pf-details.service';

@Injectable({ providedIn: 'root' })
export class PfDetailsRoutingResolveService implements Resolve<IPfDetails | null> {
  constructor(protected service: PfDetailsService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IPfDetails | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((pfDetails: HttpResponse<IPfDetails>) => {
          if (pfDetails.body) {
            return of(pfDetails.body);
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
