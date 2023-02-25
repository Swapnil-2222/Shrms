import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ICustomLeavePolicy, NewCustomLeavePolicy } from '../custom-leave-policy.model';

export type PartialUpdateCustomLeavePolicy = Partial<ICustomLeavePolicy> & Pick<ICustomLeavePolicy, 'id'>;

type RestOf<T extends ICustomLeavePolicy | NewCustomLeavePolicy> = Omit<T, 'lastModified'> & {
  lastModified?: string | null;
};

export type RestCustomLeavePolicy = RestOf<ICustomLeavePolicy>;

export type NewRestCustomLeavePolicy = RestOf<NewCustomLeavePolicy>;

export type PartialUpdateRestCustomLeavePolicy = RestOf<PartialUpdateCustomLeavePolicy>;

export type EntityResponseType = HttpResponse<ICustomLeavePolicy>;
export type EntityArrayResponseType = HttpResponse<ICustomLeavePolicy[]>;

@Injectable({ providedIn: 'root' })
export class CustomLeavePolicyService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/custom-leave-policies');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(customLeavePolicy: NewCustomLeavePolicy): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(customLeavePolicy);
    return this.http
      .post<RestCustomLeavePolicy>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(customLeavePolicy: ICustomLeavePolicy): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(customLeavePolicy);
    return this.http
      .put<RestCustomLeavePolicy>(`${this.resourceUrl}/${this.getCustomLeavePolicyIdentifier(customLeavePolicy)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(customLeavePolicy: PartialUpdateCustomLeavePolicy): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(customLeavePolicy);
    return this.http
      .patch<RestCustomLeavePolicy>(`${this.resourceUrl}/${this.getCustomLeavePolicyIdentifier(customLeavePolicy)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestCustomLeavePolicy>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestCustomLeavePolicy[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getCustomLeavePolicyIdentifier(customLeavePolicy: Pick<ICustomLeavePolicy, 'id'>): number {
    return customLeavePolicy.id;
  }

  compareCustomLeavePolicy(o1: Pick<ICustomLeavePolicy, 'id'> | null, o2: Pick<ICustomLeavePolicy, 'id'> | null): boolean {
    return o1 && o2 ? this.getCustomLeavePolicyIdentifier(o1) === this.getCustomLeavePolicyIdentifier(o2) : o1 === o2;
  }

  addCustomLeavePolicyToCollectionIfMissing<Type extends Pick<ICustomLeavePolicy, 'id'>>(
    customLeavePolicyCollection: Type[],
    ...customLeavePoliciesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const customLeavePolicies: Type[] = customLeavePoliciesToCheck.filter(isPresent);
    if (customLeavePolicies.length > 0) {
      const customLeavePolicyCollectionIdentifiers = customLeavePolicyCollection.map(
        customLeavePolicyItem => this.getCustomLeavePolicyIdentifier(customLeavePolicyItem)!
      );
      const customLeavePoliciesToAdd = customLeavePolicies.filter(customLeavePolicyItem => {
        const customLeavePolicyIdentifier = this.getCustomLeavePolicyIdentifier(customLeavePolicyItem);
        if (customLeavePolicyCollectionIdentifiers.includes(customLeavePolicyIdentifier)) {
          return false;
        }
        customLeavePolicyCollectionIdentifiers.push(customLeavePolicyIdentifier);
        return true;
      });
      return [...customLeavePoliciesToAdd, ...customLeavePolicyCollection];
    }
    return customLeavePolicyCollection;
  }

  protected convertDateFromClient<T extends ICustomLeavePolicy | NewCustomLeavePolicy | PartialUpdateCustomLeavePolicy>(
    customLeavePolicy: T
  ): RestOf<T> {
    return {
      ...customLeavePolicy,
      lastModified: customLeavePolicy.lastModified?.toJSON() ?? null,
    };
  }

  protected convertDateFromServer(restCustomLeavePolicy: RestCustomLeavePolicy): ICustomLeavePolicy {
    return {
      ...restCustomLeavePolicy,
      lastModified: restCustomLeavePolicy.lastModified ? dayjs(restCustomLeavePolicy.lastModified) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestCustomLeavePolicy>): HttpResponse<ICustomLeavePolicy> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestCustomLeavePolicy[]>): HttpResponse<ICustomLeavePolicy[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
