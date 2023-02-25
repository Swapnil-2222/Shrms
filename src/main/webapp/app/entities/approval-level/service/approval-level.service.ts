import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IApprovalLevel, NewApprovalLevel } from '../approval-level.model';

export type PartialUpdateApprovalLevel = Partial<IApprovalLevel> & Pick<IApprovalLevel, 'id'>;

type RestOf<T extends IApprovalLevel | NewApprovalLevel> = Omit<T, 'lastModified'> & {
  lastModified?: string | null;
};

export type RestApprovalLevel = RestOf<IApprovalLevel>;

export type NewRestApprovalLevel = RestOf<NewApprovalLevel>;

export type PartialUpdateRestApprovalLevel = RestOf<PartialUpdateApprovalLevel>;

export type EntityResponseType = HttpResponse<IApprovalLevel>;
export type EntityArrayResponseType = HttpResponse<IApprovalLevel[]>;

@Injectable({ providedIn: 'root' })
export class ApprovalLevelService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/approval-levels');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(approvalLevel: NewApprovalLevel): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(approvalLevel);
    return this.http
      .post<RestApprovalLevel>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(approvalLevel: IApprovalLevel): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(approvalLevel);
    return this.http
      .put<RestApprovalLevel>(`${this.resourceUrl}/${this.getApprovalLevelIdentifier(approvalLevel)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(approvalLevel: PartialUpdateApprovalLevel): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(approvalLevel);
    return this.http
      .patch<RestApprovalLevel>(`${this.resourceUrl}/${this.getApprovalLevelIdentifier(approvalLevel)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestApprovalLevel>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestApprovalLevel[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getApprovalLevelIdentifier(approvalLevel: Pick<IApprovalLevel, 'id'>): number {
    return approvalLevel.id;
  }

  compareApprovalLevel(o1: Pick<IApprovalLevel, 'id'> | null, o2: Pick<IApprovalLevel, 'id'> | null): boolean {
    return o1 && o2 ? this.getApprovalLevelIdentifier(o1) === this.getApprovalLevelIdentifier(o2) : o1 === o2;
  }

  addApprovalLevelToCollectionIfMissing<Type extends Pick<IApprovalLevel, 'id'>>(
    approvalLevelCollection: Type[],
    ...approvalLevelsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const approvalLevels: Type[] = approvalLevelsToCheck.filter(isPresent);
    if (approvalLevels.length > 0) {
      const approvalLevelCollectionIdentifiers = approvalLevelCollection.map(
        approvalLevelItem => this.getApprovalLevelIdentifier(approvalLevelItem)!
      );
      const approvalLevelsToAdd = approvalLevels.filter(approvalLevelItem => {
        const approvalLevelIdentifier = this.getApprovalLevelIdentifier(approvalLevelItem);
        if (approvalLevelCollectionIdentifiers.includes(approvalLevelIdentifier)) {
          return false;
        }
        approvalLevelCollectionIdentifiers.push(approvalLevelIdentifier);
        return true;
      });
      return [...approvalLevelsToAdd, ...approvalLevelCollection];
    }
    return approvalLevelCollection;
  }

  protected convertDateFromClient<T extends IApprovalLevel | NewApprovalLevel | PartialUpdateApprovalLevel>(approvalLevel: T): RestOf<T> {
    return {
      ...approvalLevel,
      lastModified: approvalLevel.lastModified?.toJSON() ?? null,
    };
  }

  protected convertDateFromServer(restApprovalLevel: RestApprovalLevel): IApprovalLevel {
    return {
      ...restApprovalLevel,
      lastModified: restApprovalLevel.lastModified ? dayjs(restApprovalLevel.lastModified) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestApprovalLevel>): HttpResponse<IApprovalLevel> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestApprovalLevel[]>): HttpResponse<IApprovalLevel[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
