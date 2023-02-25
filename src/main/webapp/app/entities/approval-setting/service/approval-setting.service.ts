import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IApprovalSetting, NewApprovalSetting } from '../approval-setting.model';

export type PartialUpdateApprovalSetting = Partial<IApprovalSetting> & Pick<IApprovalSetting, 'id'>;

type RestOf<T extends IApprovalSetting | NewApprovalSetting> = Omit<T, 'lastModified'> & {
  lastModified?: string | null;
};

export type RestApprovalSetting = RestOf<IApprovalSetting>;

export type NewRestApprovalSetting = RestOf<NewApprovalSetting>;

export type PartialUpdateRestApprovalSetting = RestOf<PartialUpdateApprovalSetting>;

export type EntityResponseType = HttpResponse<IApprovalSetting>;
export type EntityArrayResponseType = HttpResponse<IApprovalSetting[]>;

@Injectable({ providedIn: 'root' })
export class ApprovalSettingService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/approval-settings');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(approvalSetting: NewApprovalSetting): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(approvalSetting);
    return this.http
      .post<RestApprovalSetting>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(approvalSetting: IApprovalSetting): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(approvalSetting);
    return this.http
      .put<RestApprovalSetting>(`${this.resourceUrl}/${this.getApprovalSettingIdentifier(approvalSetting)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(approvalSetting: PartialUpdateApprovalSetting): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(approvalSetting);
    return this.http
      .patch<RestApprovalSetting>(`${this.resourceUrl}/${this.getApprovalSettingIdentifier(approvalSetting)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestApprovalSetting>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestApprovalSetting[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getApprovalSettingIdentifier(approvalSetting: Pick<IApprovalSetting, 'id'>): number {
    return approvalSetting.id;
  }

  compareApprovalSetting(o1: Pick<IApprovalSetting, 'id'> | null, o2: Pick<IApprovalSetting, 'id'> | null): boolean {
    return o1 && o2 ? this.getApprovalSettingIdentifier(o1) === this.getApprovalSettingIdentifier(o2) : o1 === o2;
  }

  addApprovalSettingToCollectionIfMissing<Type extends Pick<IApprovalSetting, 'id'>>(
    approvalSettingCollection: Type[],
    ...approvalSettingsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const approvalSettings: Type[] = approvalSettingsToCheck.filter(isPresent);
    if (approvalSettings.length > 0) {
      const approvalSettingCollectionIdentifiers = approvalSettingCollection.map(
        approvalSettingItem => this.getApprovalSettingIdentifier(approvalSettingItem)!
      );
      const approvalSettingsToAdd = approvalSettings.filter(approvalSettingItem => {
        const approvalSettingIdentifier = this.getApprovalSettingIdentifier(approvalSettingItem);
        if (approvalSettingCollectionIdentifiers.includes(approvalSettingIdentifier)) {
          return false;
        }
        approvalSettingCollectionIdentifiers.push(approvalSettingIdentifier);
        return true;
      });
      return [...approvalSettingsToAdd, ...approvalSettingCollection];
    }
    return approvalSettingCollection;
  }

  protected convertDateFromClient<T extends IApprovalSetting | NewApprovalSetting | PartialUpdateApprovalSetting>(
    approvalSetting: T
  ): RestOf<T> {
    return {
      ...approvalSetting,
      lastModified: approvalSetting.lastModified?.toJSON() ?? null,
    };
  }

  protected convertDateFromServer(restApprovalSetting: RestApprovalSetting): IApprovalSetting {
    return {
      ...restApprovalSetting,
      lastModified: restApprovalSetting.lastModified ? dayjs(restApprovalSetting.lastModified) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestApprovalSetting>): HttpResponse<IApprovalSetting> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestApprovalSetting[]>): HttpResponse<IApprovalSetting[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
