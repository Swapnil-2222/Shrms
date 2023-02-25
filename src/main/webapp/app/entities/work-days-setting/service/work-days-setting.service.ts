import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IWorkDaysSetting, NewWorkDaysSetting } from '../work-days-setting.model';

export type PartialUpdateWorkDaysSetting = Partial<IWorkDaysSetting> & Pick<IWorkDaysSetting, 'id'>;

type RestOf<T extends IWorkDaysSetting | NewWorkDaysSetting> = Omit<T, 'lastModified'> & {
  lastModified?: string | null;
};

export type RestWorkDaysSetting = RestOf<IWorkDaysSetting>;

export type NewRestWorkDaysSetting = RestOf<NewWorkDaysSetting>;

export type PartialUpdateRestWorkDaysSetting = RestOf<PartialUpdateWorkDaysSetting>;

export type EntityResponseType = HttpResponse<IWorkDaysSetting>;
export type EntityArrayResponseType = HttpResponse<IWorkDaysSetting[]>;

@Injectable({ providedIn: 'root' })
export class WorkDaysSettingService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/work-days-settings');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(workDaysSetting: NewWorkDaysSetting): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(workDaysSetting);
    return this.http
      .post<RestWorkDaysSetting>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(workDaysSetting: IWorkDaysSetting): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(workDaysSetting);
    return this.http
      .put<RestWorkDaysSetting>(`${this.resourceUrl}/${this.getWorkDaysSettingIdentifier(workDaysSetting)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(workDaysSetting: PartialUpdateWorkDaysSetting): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(workDaysSetting);
    return this.http
      .patch<RestWorkDaysSetting>(`${this.resourceUrl}/${this.getWorkDaysSettingIdentifier(workDaysSetting)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestWorkDaysSetting>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestWorkDaysSetting[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getWorkDaysSettingIdentifier(workDaysSetting: Pick<IWorkDaysSetting, 'id'>): number {
    return workDaysSetting.id;
  }

  compareWorkDaysSetting(o1: Pick<IWorkDaysSetting, 'id'> | null, o2: Pick<IWorkDaysSetting, 'id'> | null): boolean {
    return o1 && o2 ? this.getWorkDaysSettingIdentifier(o1) === this.getWorkDaysSettingIdentifier(o2) : o1 === o2;
  }

  addWorkDaysSettingToCollectionIfMissing<Type extends Pick<IWorkDaysSetting, 'id'>>(
    workDaysSettingCollection: Type[],
    ...workDaysSettingsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const workDaysSettings: Type[] = workDaysSettingsToCheck.filter(isPresent);
    if (workDaysSettings.length > 0) {
      const workDaysSettingCollectionIdentifiers = workDaysSettingCollection.map(
        workDaysSettingItem => this.getWorkDaysSettingIdentifier(workDaysSettingItem)!
      );
      const workDaysSettingsToAdd = workDaysSettings.filter(workDaysSettingItem => {
        const workDaysSettingIdentifier = this.getWorkDaysSettingIdentifier(workDaysSettingItem);
        if (workDaysSettingCollectionIdentifiers.includes(workDaysSettingIdentifier)) {
          return false;
        }
        workDaysSettingCollectionIdentifiers.push(workDaysSettingIdentifier);
        return true;
      });
      return [...workDaysSettingsToAdd, ...workDaysSettingCollection];
    }
    return workDaysSettingCollection;
  }

  protected convertDateFromClient<T extends IWorkDaysSetting | NewWorkDaysSetting | PartialUpdateWorkDaysSetting>(
    workDaysSetting: T
  ): RestOf<T> {
    return {
      ...workDaysSetting,
      lastModified: workDaysSetting.lastModified?.toJSON() ?? null,
    };
  }

  protected convertDateFromServer(restWorkDaysSetting: RestWorkDaysSetting): IWorkDaysSetting {
    return {
      ...restWorkDaysSetting,
      lastModified: restWorkDaysSetting.lastModified ? dayjs(restWorkDaysSetting.lastModified) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestWorkDaysSetting>): HttpResponse<IWorkDaysSetting> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestWorkDaysSetting[]>): HttpResponse<IWorkDaysSetting[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
