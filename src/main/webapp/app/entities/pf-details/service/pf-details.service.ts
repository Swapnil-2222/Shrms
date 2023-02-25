import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IPfDetails, NewPfDetails } from '../pf-details.model';

export type PartialUpdatePfDetails = Partial<IPfDetails> & Pick<IPfDetails, 'id'>;

type RestOf<T extends IPfDetails | NewPfDetails> = Omit<T, 'lastModified'> & {
  lastModified?: string | null;
};

export type RestPfDetails = RestOf<IPfDetails>;

export type NewRestPfDetails = RestOf<NewPfDetails>;

export type PartialUpdateRestPfDetails = RestOf<PartialUpdatePfDetails>;

export type EntityResponseType = HttpResponse<IPfDetails>;
export type EntityArrayResponseType = HttpResponse<IPfDetails[]>;

@Injectable({ providedIn: 'root' })
export class PfDetailsService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/pf-details');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(pfDetails: NewPfDetails): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(pfDetails);
    return this.http
      .post<RestPfDetails>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(pfDetails: IPfDetails): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(pfDetails);
    return this.http
      .put<RestPfDetails>(`${this.resourceUrl}/${this.getPfDetailsIdentifier(pfDetails)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(pfDetails: PartialUpdatePfDetails): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(pfDetails);
    return this.http
      .patch<RestPfDetails>(`${this.resourceUrl}/${this.getPfDetailsIdentifier(pfDetails)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestPfDetails>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestPfDetails[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getPfDetailsIdentifier(pfDetails: Pick<IPfDetails, 'id'>): number {
    return pfDetails.id;
  }

  comparePfDetails(o1: Pick<IPfDetails, 'id'> | null, o2: Pick<IPfDetails, 'id'> | null): boolean {
    return o1 && o2 ? this.getPfDetailsIdentifier(o1) === this.getPfDetailsIdentifier(o2) : o1 === o2;
  }

  addPfDetailsToCollectionIfMissing<Type extends Pick<IPfDetails, 'id'>>(
    pfDetailsCollection: Type[],
    ...pfDetailsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const pfDetails: Type[] = pfDetailsToCheck.filter(isPresent);
    if (pfDetails.length > 0) {
      const pfDetailsCollectionIdentifiers = pfDetailsCollection.map(pfDetailsItem => this.getPfDetailsIdentifier(pfDetailsItem)!);
      const pfDetailsToAdd = pfDetails.filter(pfDetailsItem => {
        const pfDetailsIdentifier = this.getPfDetailsIdentifier(pfDetailsItem);
        if (pfDetailsCollectionIdentifiers.includes(pfDetailsIdentifier)) {
          return false;
        }
        pfDetailsCollectionIdentifiers.push(pfDetailsIdentifier);
        return true;
      });
      return [...pfDetailsToAdd, ...pfDetailsCollection];
    }
    return pfDetailsCollection;
  }

  protected convertDateFromClient<T extends IPfDetails | NewPfDetails | PartialUpdatePfDetails>(pfDetails: T): RestOf<T> {
    return {
      ...pfDetails,
      lastModified: pfDetails.lastModified?.toJSON() ?? null,
    };
  }

  protected convertDateFromServer(restPfDetails: RestPfDetails): IPfDetails {
    return {
      ...restPfDetails,
      lastModified: restPfDetails.lastModified ? dayjs(restPfDetails.lastModified) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestPfDetails>): HttpResponse<IPfDetails> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestPfDetails[]>): HttpResponse<IPfDetails[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
