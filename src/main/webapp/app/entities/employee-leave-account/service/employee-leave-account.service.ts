import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IEmployeeLeaveAccount, NewEmployeeLeaveAccount } from '../employee-leave-account.model';

export type PartialUpdateEmployeeLeaveAccount = Partial<IEmployeeLeaveAccount> & Pick<IEmployeeLeaveAccount, 'id'>;

type RestOf<T extends IEmployeeLeaveAccount | NewEmployeeLeaveAccount> = Omit<T, 'date' | 'lastModified'> & {
  date?: string | null;
  lastModified?: string | null;
};

export type RestEmployeeLeaveAccount = RestOf<IEmployeeLeaveAccount>;

export type NewRestEmployeeLeaveAccount = RestOf<NewEmployeeLeaveAccount>;

export type PartialUpdateRestEmployeeLeaveAccount = RestOf<PartialUpdateEmployeeLeaveAccount>;

export type EntityResponseType = HttpResponse<IEmployeeLeaveAccount>;
export type EntityArrayResponseType = HttpResponse<IEmployeeLeaveAccount[]>;

@Injectable({ providedIn: 'root' })
export class EmployeeLeaveAccountService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/employee-leave-accounts');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(employeeLeaveAccount: NewEmployeeLeaveAccount): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(employeeLeaveAccount);
    return this.http
      .post<RestEmployeeLeaveAccount>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(employeeLeaveAccount: IEmployeeLeaveAccount): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(employeeLeaveAccount);
    return this.http
      .put<RestEmployeeLeaveAccount>(`${this.resourceUrl}/${this.getEmployeeLeaveAccountIdentifier(employeeLeaveAccount)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(employeeLeaveAccount: PartialUpdateEmployeeLeaveAccount): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(employeeLeaveAccount);
    return this.http
      .patch<RestEmployeeLeaveAccount>(`${this.resourceUrl}/${this.getEmployeeLeaveAccountIdentifier(employeeLeaveAccount)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestEmployeeLeaveAccount>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestEmployeeLeaveAccount[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getEmployeeLeaveAccountIdentifier(employeeLeaveAccount: Pick<IEmployeeLeaveAccount, 'id'>): number {
    return employeeLeaveAccount.id;
  }

  compareEmployeeLeaveAccount(o1: Pick<IEmployeeLeaveAccount, 'id'> | null, o2: Pick<IEmployeeLeaveAccount, 'id'> | null): boolean {
    return o1 && o2 ? this.getEmployeeLeaveAccountIdentifier(o1) === this.getEmployeeLeaveAccountIdentifier(o2) : o1 === o2;
  }

  addEmployeeLeaveAccountToCollectionIfMissing<Type extends Pick<IEmployeeLeaveAccount, 'id'>>(
    employeeLeaveAccountCollection: Type[],
    ...employeeLeaveAccountsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const employeeLeaveAccounts: Type[] = employeeLeaveAccountsToCheck.filter(isPresent);
    if (employeeLeaveAccounts.length > 0) {
      const employeeLeaveAccountCollectionIdentifiers = employeeLeaveAccountCollection.map(
        employeeLeaveAccountItem => this.getEmployeeLeaveAccountIdentifier(employeeLeaveAccountItem)!
      );
      const employeeLeaveAccountsToAdd = employeeLeaveAccounts.filter(employeeLeaveAccountItem => {
        const employeeLeaveAccountIdentifier = this.getEmployeeLeaveAccountIdentifier(employeeLeaveAccountItem);
        if (employeeLeaveAccountCollectionIdentifiers.includes(employeeLeaveAccountIdentifier)) {
          return false;
        }
        employeeLeaveAccountCollectionIdentifiers.push(employeeLeaveAccountIdentifier);
        return true;
      });
      return [...employeeLeaveAccountsToAdd, ...employeeLeaveAccountCollection];
    }
    return employeeLeaveAccountCollection;
  }

  protected convertDateFromClient<T extends IEmployeeLeaveAccount | NewEmployeeLeaveAccount | PartialUpdateEmployeeLeaveAccount>(
    employeeLeaveAccount: T
  ): RestOf<T> {
    return {
      ...employeeLeaveAccount,
      date: employeeLeaveAccount.date?.toJSON() ?? null,
      lastModified: employeeLeaveAccount.lastModified?.toJSON() ?? null,
    };
  }

  protected convertDateFromServer(restEmployeeLeaveAccount: RestEmployeeLeaveAccount): IEmployeeLeaveAccount {
    return {
      ...restEmployeeLeaveAccount,
      date: restEmployeeLeaveAccount.date ? dayjs(restEmployeeLeaveAccount.date) : undefined,
      lastModified: restEmployeeLeaveAccount.lastModified ? dayjs(restEmployeeLeaveAccount.lastModified) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestEmployeeLeaveAccount>): HttpResponse<IEmployeeLeaveAccount> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestEmployeeLeaveAccount[]>): HttpResponse<IEmployeeLeaveAccount[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
