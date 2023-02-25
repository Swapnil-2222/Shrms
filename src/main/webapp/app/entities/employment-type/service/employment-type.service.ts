import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IEmploymentType, NewEmploymentType } from '../employment-type.model';

export type PartialUpdateEmploymentType = Partial<IEmploymentType> & Pick<IEmploymentType, 'id'>;

type RestOf<T extends IEmploymentType | NewEmploymentType> = Omit<T, 'lastModified'> & {
  lastModified?: string | null;
};

export type RestEmploymentType = RestOf<IEmploymentType>;

export type NewRestEmploymentType = RestOf<NewEmploymentType>;

export type PartialUpdateRestEmploymentType = RestOf<PartialUpdateEmploymentType>;

export type EntityResponseType = HttpResponse<IEmploymentType>;
export type EntityArrayResponseType = HttpResponse<IEmploymentType[]>;

@Injectable({ providedIn: 'root' })
export class EmploymentTypeService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/employment-types');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(employmentType: NewEmploymentType): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(employmentType);
    return this.http
      .post<RestEmploymentType>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(employmentType: IEmploymentType): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(employmentType);
    return this.http
      .put<RestEmploymentType>(`${this.resourceUrl}/${this.getEmploymentTypeIdentifier(employmentType)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(employmentType: PartialUpdateEmploymentType): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(employmentType);
    return this.http
      .patch<RestEmploymentType>(`${this.resourceUrl}/${this.getEmploymentTypeIdentifier(employmentType)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestEmploymentType>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestEmploymentType[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getEmploymentTypeIdentifier(employmentType: Pick<IEmploymentType, 'id'>): number {
    return employmentType.id;
  }

  compareEmploymentType(o1: Pick<IEmploymentType, 'id'> | null, o2: Pick<IEmploymentType, 'id'> | null): boolean {
    return o1 && o2 ? this.getEmploymentTypeIdentifier(o1) === this.getEmploymentTypeIdentifier(o2) : o1 === o2;
  }

  addEmploymentTypeToCollectionIfMissing<Type extends Pick<IEmploymentType, 'id'>>(
    employmentTypeCollection: Type[],
    ...employmentTypesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const employmentTypes: Type[] = employmentTypesToCheck.filter(isPresent);
    if (employmentTypes.length > 0) {
      const employmentTypeCollectionIdentifiers = employmentTypeCollection.map(
        employmentTypeItem => this.getEmploymentTypeIdentifier(employmentTypeItem)!
      );
      const employmentTypesToAdd = employmentTypes.filter(employmentTypeItem => {
        const employmentTypeIdentifier = this.getEmploymentTypeIdentifier(employmentTypeItem);
        if (employmentTypeCollectionIdentifiers.includes(employmentTypeIdentifier)) {
          return false;
        }
        employmentTypeCollectionIdentifiers.push(employmentTypeIdentifier);
        return true;
      });
      return [...employmentTypesToAdd, ...employmentTypeCollection];
    }
    return employmentTypeCollection;
  }

  protected convertDateFromClient<T extends IEmploymentType | NewEmploymentType | PartialUpdateEmploymentType>(
    employmentType: T
  ): RestOf<T> {
    return {
      ...employmentType,
      lastModified: employmentType.lastModified?.toJSON() ?? null,
    };
  }

  protected convertDateFromServer(restEmploymentType: RestEmploymentType): IEmploymentType {
    return {
      ...restEmploymentType,
      lastModified: restEmploymentType.lastModified ? dayjs(restEmploymentType.lastModified) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestEmploymentType>): HttpResponse<IEmploymentType> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestEmploymentType[]>): HttpResponse<IEmploymentType[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
