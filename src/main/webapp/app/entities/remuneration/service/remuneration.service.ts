import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IRemuneration, NewRemuneration } from '../remuneration.model';

export type PartialUpdateRemuneration = Partial<IRemuneration> & Pick<IRemuneration, 'id'>;

type RestOf<T extends IRemuneration | NewRemuneration> = Omit<T, 'lastModified'> & {
  lastModified?: string | null;
};

export type RestRemuneration = RestOf<IRemuneration>;

export type NewRestRemuneration = RestOf<NewRemuneration>;

export type PartialUpdateRestRemuneration = RestOf<PartialUpdateRemuneration>;

export type EntityResponseType = HttpResponse<IRemuneration>;
export type EntityArrayResponseType = HttpResponse<IRemuneration[]>;

@Injectable({ providedIn: 'root' })
export class RemunerationService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/remunerations');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(remuneration: NewRemuneration): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(remuneration);
    return this.http
      .post<RestRemuneration>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(remuneration: IRemuneration): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(remuneration);
    return this.http
      .put<RestRemuneration>(`${this.resourceUrl}/${this.getRemunerationIdentifier(remuneration)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(remuneration: PartialUpdateRemuneration): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(remuneration);
    return this.http
      .patch<RestRemuneration>(`${this.resourceUrl}/${this.getRemunerationIdentifier(remuneration)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestRemuneration>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestRemuneration[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getRemunerationIdentifier(remuneration: Pick<IRemuneration, 'id'>): number {
    return remuneration.id;
  }

  compareRemuneration(o1: Pick<IRemuneration, 'id'> | null, o2: Pick<IRemuneration, 'id'> | null): boolean {
    return o1 && o2 ? this.getRemunerationIdentifier(o1) === this.getRemunerationIdentifier(o2) : o1 === o2;
  }

  addRemunerationToCollectionIfMissing<Type extends Pick<IRemuneration, 'id'>>(
    remunerationCollection: Type[],
    ...remunerationsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const remunerations: Type[] = remunerationsToCheck.filter(isPresent);
    if (remunerations.length > 0) {
      const remunerationCollectionIdentifiers = remunerationCollection.map(
        remunerationItem => this.getRemunerationIdentifier(remunerationItem)!
      );
      const remunerationsToAdd = remunerations.filter(remunerationItem => {
        const remunerationIdentifier = this.getRemunerationIdentifier(remunerationItem);
        if (remunerationCollectionIdentifiers.includes(remunerationIdentifier)) {
          return false;
        }
        remunerationCollectionIdentifiers.push(remunerationIdentifier);
        return true;
      });
      return [...remunerationsToAdd, ...remunerationCollection];
    }
    return remunerationCollection;
  }

  protected convertDateFromClient<T extends IRemuneration | NewRemuneration | PartialUpdateRemuneration>(remuneration: T): RestOf<T> {
    return {
      ...remuneration,
      lastModified: remuneration.lastModified?.toJSON() ?? null,
    };
  }

  protected convertDateFromServer(restRemuneration: RestRemuneration): IRemuneration {
    return {
      ...restRemuneration,
      lastModified: restRemuneration.lastModified ? dayjs(restRemuneration.lastModified) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestRemuneration>): HttpResponse<IRemuneration> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestRemuneration[]>): HttpResponse<IRemuneration[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
