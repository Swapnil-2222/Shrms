import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ICustomApprovar } from '../custom-approvar.model';
import { CustomApprovarService } from '../service/custom-approvar.service';

@Injectable({ providedIn: 'root' })
export class CustomApprovarRoutingResolveService implements Resolve<ICustomApprovar | null> {
  constructor(protected service: CustomApprovarService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICustomApprovar | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((customApprovar: HttpResponse<ICustomApprovar>) => {
          if (customApprovar.body) {
            return of(customApprovar.body);
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
