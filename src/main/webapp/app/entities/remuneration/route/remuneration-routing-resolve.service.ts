import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IRemuneration } from '../remuneration.model';
import { RemunerationService } from '../service/remuneration.service';

@Injectable({ providedIn: 'root' })
export class RemunerationRoutingResolveService implements Resolve<IRemuneration | null> {
  constructor(protected service: RemunerationService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IRemuneration | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((remuneration: HttpResponse<IRemuneration>) => {
          if (remuneration.body) {
            return of(remuneration.body);
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
