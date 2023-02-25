import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ICustomApprovar, NewCustomApprovar } from '../custom-approvar.model';

export type PartialUpdateCustomApprovar = Partial<ICustomApprovar> & Pick<ICustomApprovar, 'id'>;

type RestOf<T extends ICustomApprovar | NewCustomApprovar> = Omit<T, 'lastModified'> & {
  lastModified?: string | null;
};

export type RestCustomApprovar = RestOf<ICustomApprovar>;

export type NewRestCustomApprovar = RestOf<NewCustomApprovar>;

export type PartialUpdateRestCustomApprovar = RestOf<PartialUpdateCustomApprovar>;

export type EntityResponseType = HttpResponse<ICustomApprovar>;
export type EntityArrayResponseType = HttpResponse<ICustomApprovar[]>;

@Injectable({ providedIn: 'root' })
export class CustomApprovarService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/custom-approvars');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(customApprovar: NewCustomApprovar): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(customApprovar);
    return this.http
      .post<RestCustomApprovar>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(customApprovar: ICustomApprovar): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(customApprovar);
    return this.http
      .put<RestCustomApprovar>(`${this.resourceUrl}/${this.getCustomApprovarIdentifier(customApprovar)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(customApprovar: PartialUpdateCustomApprovar): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(customApprovar);
    return this.http
      .patch<RestCustomApprovar>(`${this.resourceUrl}/${this.getCustomApprovarIdentifier(customApprovar)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestCustomApprovar>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestCustomApprovar[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getCustomApprovarIdentifier(customApprovar: Pick<ICustomApprovar, 'id'>): number {
    return customApprovar.id;
  }

  compareCustomApprovar(o1: Pick<ICustomApprovar, 'id'> | null, o2: Pick<ICustomApprovar, 'id'> | null): boolean {
    return o1 && o2 ? this.getCustomApprovarIdentifier(o1) === this.getCustomApprovarIdentifier(o2) : o1 === o2;
  }

  addCustomApprovarToCollectionIfMissing<Type extends Pick<ICustomApprovar, 'id'>>(
    customApprovarCollection: Type[],
    ...customApprovarsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const customApprovars: Type[] = customApprovarsToCheck.filter(isPresent);
    if (customApprovars.length > 0) {
      const customApprovarCollectionIdentifiers = customApprovarCollection.map(
        customApprovarItem => this.getCustomApprovarIdentifier(customApprovarItem)!
      );
      const customApprovarsToAdd = customApprovars.filter(customApprovarItem => {
        const customApprovarIdentifier = this.getCustomApprovarIdentifier(customApprovarItem);
        if (customApprovarCollectionIdentifiers.includes(customApprovarIdentifier)) {
          return false;
        }
        customApprovarCollectionIdentifiers.push(customApprovarIdentifier);
        return true;
      });
      return [...customApprovarsToAdd, ...customApprovarCollection];
    }
    return customApprovarCollection;
  }

  protected convertDateFromClient<T extends ICustomApprovar | NewCustomApprovar | PartialUpdateCustomApprovar>(
    customApprovar: T
  ): RestOf<T> {
    return {
      ...customApprovar,
      lastModified: customApprovar.lastModified?.toJSON() ?? null,
    };
  }

  protected convertDateFromServer(restCustomApprovar: RestCustomApprovar): ICustomApprovar {
    return {
      ...restCustomApprovar,
      lastModified: restCustomApprovar.lastModified ? dayjs(restCustomApprovar.lastModified) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestCustomApprovar>): HttpResponse<ICustomApprovar> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestCustomApprovar[]>): HttpResponse<ICustomApprovar[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
