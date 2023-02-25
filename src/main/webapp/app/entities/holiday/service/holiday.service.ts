import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IHoliday, NewHoliday } from '../holiday.model';

export type PartialUpdateHoliday = Partial<IHoliday> & Pick<IHoliday, 'id'>;

type RestOf<T extends IHoliday | NewHoliday> = Omit<T, 'holidayDate' | 'year' | 'lastModified'> & {
  holidayDate?: string | null;
  year?: string | null;
  lastModified?: string | null;
};

export type RestHoliday = RestOf<IHoliday>;

export type NewRestHoliday = RestOf<NewHoliday>;

export type PartialUpdateRestHoliday = RestOf<PartialUpdateHoliday>;

export type EntityResponseType = HttpResponse<IHoliday>;
export type EntityArrayResponseType = HttpResponse<IHoliday[]>;

@Injectable({ providedIn: 'root' })
export class HolidayService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/holidays');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(holiday: NewHoliday): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(holiday);
    return this.http
      .post<RestHoliday>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(holiday: IHoliday): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(holiday);
    return this.http
      .put<RestHoliday>(`${this.resourceUrl}/${this.getHolidayIdentifier(holiday)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(holiday: PartialUpdateHoliday): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(holiday);
    return this.http
      .patch<RestHoliday>(`${this.resourceUrl}/${this.getHolidayIdentifier(holiday)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestHoliday>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestHoliday[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getHolidayIdentifier(holiday: Pick<IHoliday, 'id'>): number {
    return holiday.id;
  }

  compareHoliday(o1: Pick<IHoliday, 'id'> | null, o2: Pick<IHoliday, 'id'> | null): boolean {
    return o1 && o2 ? this.getHolidayIdentifier(o1) === this.getHolidayIdentifier(o2) : o1 === o2;
  }

  addHolidayToCollectionIfMissing<Type extends Pick<IHoliday, 'id'>>(
    holidayCollection: Type[],
    ...holidaysToCheck: (Type | null | undefined)[]
  ): Type[] {
    const holidays: Type[] = holidaysToCheck.filter(isPresent);
    if (holidays.length > 0) {
      const holidayCollectionIdentifiers = holidayCollection.map(holidayItem => this.getHolidayIdentifier(holidayItem)!);
      const holidaysToAdd = holidays.filter(holidayItem => {
        const holidayIdentifier = this.getHolidayIdentifier(holidayItem);
        if (holidayCollectionIdentifiers.includes(holidayIdentifier)) {
          return false;
        }
        holidayCollectionIdentifiers.push(holidayIdentifier);
        return true;
      });
      return [...holidaysToAdd, ...holidayCollection];
    }
    return holidayCollection;
  }

  protected convertDateFromClient<T extends IHoliday | NewHoliday | PartialUpdateHoliday>(holiday: T): RestOf<T> {
    return {
      ...holiday,
      holidayDate: holiday.holidayDate?.toJSON() ?? null,
      year: holiday.year?.toJSON() ?? null,
      lastModified: holiday.lastModified?.toJSON() ?? null,
    };
  }

  protected convertDateFromServer(restHoliday: RestHoliday): IHoliday {
    return {
      ...restHoliday,
      holidayDate: restHoliday.holidayDate ? dayjs(restHoliday.holidayDate) : undefined,
      year: restHoliday.year ? dayjs(restHoliday.year) : undefined,
      lastModified: restHoliday.lastModified ? dayjs(restHoliday.lastModified) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestHoliday>): HttpResponse<IHoliday> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestHoliday[]>): HttpResponse<IHoliday[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
