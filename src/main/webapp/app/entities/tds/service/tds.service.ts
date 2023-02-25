import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ITds, NewTds } from '../tds.model';

export type PartialUpdateTds = Partial<ITds> & Pick<ITds, 'id'>;

type RestOf<T extends ITds | NewTds> = Omit<T, 'salaryFrom' | 'salaryTo' | 'lastModified'> & {
  salaryFrom?: string | null;
  salaryTo?: string | null;
  lastModified?: string | null;
};

export type RestTds = RestOf<ITds>;

export type NewRestTds = RestOf<NewTds>;

export type PartialUpdateRestTds = RestOf<PartialUpdateTds>;

export type EntityResponseType = HttpResponse<ITds>;
export type EntityArrayResponseType = HttpResponse<ITds[]>;

@Injectable({ providedIn: 'root' })
export class TdsService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/tds');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(tds: NewTds): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(tds);
    return this.http.post<RestTds>(this.resourceUrl, copy, { observe: 'response' }).pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(tds: ITds): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(tds);
    return this.http
      .put<RestTds>(`${this.resourceUrl}/${this.getTdsIdentifier(tds)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(tds: PartialUpdateTds): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(tds);
    return this.http
      .patch<RestTds>(`${this.resourceUrl}/${this.getTdsIdentifier(tds)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestTds>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestTds[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getTdsIdentifier(tds: Pick<ITds, 'id'>): number {
    return tds.id;
  }

  compareTds(o1: Pick<ITds, 'id'> | null, o2: Pick<ITds, 'id'> | null): boolean {
    return o1 && o2 ? this.getTdsIdentifier(o1) === this.getTdsIdentifier(o2) : o1 === o2;
  }

  addTdsToCollectionIfMissing<Type extends Pick<ITds, 'id'>>(tdsCollection: Type[], ...tdsToCheck: (Type | null | undefined)[]): Type[] {
    const tds: Type[] = tdsToCheck.filter(isPresent);
    if (tds.length > 0) {
      const tdsCollectionIdentifiers = tdsCollection.map(tdsItem => this.getTdsIdentifier(tdsItem)!);
      const tdsToAdd = tds.filter(tdsItem => {
        const tdsIdentifier = this.getTdsIdentifier(tdsItem);
        if (tdsCollectionIdentifiers.includes(tdsIdentifier)) {
          return false;
        }
        tdsCollectionIdentifiers.push(tdsIdentifier);
        return true;
      });
      return [...tdsToAdd, ...tdsCollection];
    }
    return tdsCollection;
  }

  protected convertDateFromClient<T extends ITds | NewTds | PartialUpdateTds>(tds: T): RestOf<T> {
    return {
      ...tds,
      salaryFrom: tds.salaryFrom?.toJSON() ?? null,
      salaryTo: tds.salaryTo?.toJSON() ?? null,
      lastModified: tds.lastModified?.toJSON() ?? null,
    };
  }

  protected convertDateFromServer(restTds: RestTds): ITds {
    return {
      ...restTds,
      salaryFrom: restTds.salaryFrom ? dayjs(restTds.salaryFrom) : undefined,
      salaryTo: restTds.salaryTo ? dayjs(restTds.salaryTo) : undefined,
      lastModified: restTds.lastModified ? dayjs(restTds.lastModified) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestTds>): HttpResponse<ITds> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestTds[]>): HttpResponse<ITds[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
