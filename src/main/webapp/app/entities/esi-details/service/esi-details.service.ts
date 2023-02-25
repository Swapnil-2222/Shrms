import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IEsiDetails, NewEsiDetails } from '../esi-details.model';

export type PartialUpdateEsiDetails = Partial<IEsiDetails> & Pick<IEsiDetails, 'id'>;

type RestOf<T extends IEsiDetails | NewEsiDetails> = Omit<T, 'lastModified'> & {
  lastModified?: string | null;
};

export type RestEsiDetails = RestOf<IEsiDetails>;

export type NewRestEsiDetails = RestOf<NewEsiDetails>;

export type PartialUpdateRestEsiDetails = RestOf<PartialUpdateEsiDetails>;

export type EntityResponseType = HttpResponse<IEsiDetails>;
export type EntityArrayResponseType = HttpResponse<IEsiDetails[]>;

@Injectable({ providedIn: 'root' })
export class EsiDetailsService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/esi-details');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(esiDetails: NewEsiDetails): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(esiDetails);
    return this.http
      .post<RestEsiDetails>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(esiDetails: IEsiDetails): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(esiDetails);
    return this.http
      .put<RestEsiDetails>(`${this.resourceUrl}/${this.getEsiDetailsIdentifier(esiDetails)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(esiDetails: PartialUpdateEsiDetails): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(esiDetails);
    return this.http
      .patch<RestEsiDetails>(`${this.resourceUrl}/${this.getEsiDetailsIdentifier(esiDetails)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestEsiDetails>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestEsiDetails[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getEsiDetailsIdentifier(esiDetails: Pick<IEsiDetails, 'id'>): number {
    return esiDetails.id;
  }

  compareEsiDetails(o1: Pick<IEsiDetails, 'id'> | null, o2: Pick<IEsiDetails, 'id'> | null): boolean {
    return o1 && o2 ? this.getEsiDetailsIdentifier(o1) === this.getEsiDetailsIdentifier(o2) : o1 === o2;
  }

  addEsiDetailsToCollectionIfMissing<Type extends Pick<IEsiDetails, 'id'>>(
    esiDetailsCollection: Type[],
    ...esiDetailsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const esiDetails: Type[] = esiDetailsToCheck.filter(isPresent);
    if (esiDetails.length > 0) {
      const esiDetailsCollectionIdentifiers = esiDetailsCollection.map(esiDetailsItem => this.getEsiDetailsIdentifier(esiDetailsItem)!);
      const esiDetailsToAdd = esiDetails.filter(esiDetailsItem => {
        const esiDetailsIdentifier = this.getEsiDetailsIdentifier(esiDetailsItem);
        if (esiDetailsCollectionIdentifiers.includes(esiDetailsIdentifier)) {
          return false;
        }
        esiDetailsCollectionIdentifiers.push(esiDetailsIdentifier);
        return true;
      });
      return [...esiDetailsToAdd, ...esiDetailsCollection];
    }
    return esiDetailsCollection;
  }

  protected convertDateFromClient<T extends IEsiDetails | NewEsiDetails | PartialUpdateEsiDetails>(esiDetails: T): RestOf<T> {
    return {
      ...esiDetails,
      lastModified: esiDetails.lastModified?.toJSON() ?? null,
    };
  }

  protected convertDateFromServer(restEsiDetails: RestEsiDetails): IEsiDetails {
    return {
      ...restEsiDetails,
      lastModified: restEsiDetails.lastModified ? dayjs(restEsiDetails.lastModified) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestEsiDetails>): HttpResponse<IEsiDetails> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestEsiDetails[]>): HttpResponse<IEsiDetails[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
