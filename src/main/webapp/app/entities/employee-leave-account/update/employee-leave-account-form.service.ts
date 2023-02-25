import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IEmployeeLeaveAccount, NewEmployeeLeaveAccount } from '../employee-leave-account.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IEmployeeLeaveAccount for edit and NewEmployeeLeaveAccountFormGroupInput for create.
 */
type EmployeeLeaveAccountFormGroupInput = IEmployeeLeaveAccount | PartialWithRequiredKeyOf<NewEmployeeLeaveAccount>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends IEmployeeLeaveAccount | NewEmployeeLeaveAccount> = Omit<T, 'date' | 'lastModified'> & {
  date?: string | null;
  lastModified?: string | null;
};

type EmployeeLeaveAccountFormRawValue = FormValueOf<IEmployeeLeaveAccount>;

type NewEmployeeLeaveAccountFormRawValue = FormValueOf<NewEmployeeLeaveAccount>;

type EmployeeLeaveAccountFormDefaults = Pick<NewEmployeeLeaveAccount, 'id' | 'date' | 'lastModified'>;

type EmployeeLeaveAccountFormGroupContent = {
  id: FormControl<EmployeeLeaveAccountFormRawValue['id'] | NewEmployeeLeaveAccount['id']>;
  leaveTypeId: FormControl<EmployeeLeaveAccountFormRawValue['leaveTypeId']>;
  employeeId: FormControl<EmployeeLeaveAccountFormRawValue['employeeId']>;
  carriedLeaves: FormControl<EmployeeLeaveAccountFormRawValue['carriedLeaves']>;
  creditedLeaves: FormControl<EmployeeLeaveAccountFormRawValue['creditedLeaves']>;
  date: FormControl<EmployeeLeaveAccountFormRawValue['date']>;
  balance: FormControl<EmployeeLeaveAccountFormRawValue['balance']>;
  companyId: FormControl<EmployeeLeaveAccountFormRawValue['companyId']>;
  status: FormControl<EmployeeLeaveAccountFormRawValue['status']>;
  lastModified: FormControl<EmployeeLeaveAccountFormRawValue['lastModified']>;
  lastModifiedBy: FormControl<EmployeeLeaveAccountFormRawValue['lastModifiedBy']>;
};

export type EmployeeLeaveAccountFormGroup = FormGroup<EmployeeLeaveAccountFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class EmployeeLeaveAccountFormService {
  createEmployeeLeaveAccountFormGroup(
    employeeLeaveAccount: EmployeeLeaveAccountFormGroupInput = { id: null }
  ): EmployeeLeaveAccountFormGroup {
    const employeeLeaveAccountRawValue = this.convertEmployeeLeaveAccountToEmployeeLeaveAccountRawValue({
      ...this.getFormDefaults(),
      ...employeeLeaveAccount,
    });
    return new FormGroup<EmployeeLeaveAccountFormGroupContent>({
      id: new FormControl(
        { value: employeeLeaveAccountRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      leaveTypeId: new FormControl(employeeLeaveAccountRawValue.leaveTypeId),
      employeeId: new FormControl(employeeLeaveAccountRawValue.employeeId),
      carriedLeaves: new FormControl(employeeLeaveAccountRawValue.carriedLeaves),
      creditedLeaves: new FormControl(employeeLeaveAccountRawValue.creditedLeaves),
      date: new FormControl(employeeLeaveAccountRawValue.date),
      balance: new FormControl(employeeLeaveAccountRawValue.balance),
      companyId: new FormControl(employeeLeaveAccountRawValue.companyId),
      status: new FormControl(employeeLeaveAccountRawValue.status),
      lastModified: new FormControl(employeeLeaveAccountRawValue.lastModified),
      lastModifiedBy: new FormControl(employeeLeaveAccountRawValue.lastModifiedBy),
    });
  }

  getEmployeeLeaveAccount(form: EmployeeLeaveAccountFormGroup): IEmployeeLeaveAccount | NewEmployeeLeaveAccount {
    return this.convertEmployeeLeaveAccountRawValueToEmployeeLeaveAccount(
      form.getRawValue() as EmployeeLeaveAccountFormRawValue | NewEmployeeLeaveAccountFormRawValue
    );
  }

  resetForm(form: EmployeeLeaveAccountFormGroup, employeeLeaveAccount: EmployeeLeaveAccountFormGroupInput): void {
    const employeeLeaveAccountRawValue = this.convertEmployeeLeaveAccountToEmployeeLeaveAccountRawValue({
      ...this.getFormDefaults(),
      ...employeeLeaveAccount,
    });
    form.reset(
      {
        ...employeeLeaveAccountRawValue,
        id: { value: employeeLeaveAccountRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): EmployeeLeaveAccountFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      date: currentTime,
      lastModified: currentTime,
    };
  }

  private convertEmployeeLeaveAccountRawValueToEmployeeLeaveAccount(
    rawEmployeeLeaveAccount: EmployeeLeaveAccountFormRawValue | NewEmployeeLeaveAccountFormRawValue
  ): IEmployeeLeaveAccount | NewEmployeeLeaveAccount {
    return {
      ...rawEmployeeLeaveAccount,
      date: dayjs(rawEmployeeLeaveAccount.date, DATE_TIME_FORMAT),
      lastModified: dayjs(rawEmployeeLeaveAccount.lastModified, DATE_TIME_FORMAT),
    };
  }

  private convertEmployeeLeaveAccountToEmployeeLeaveAccountRawValue(
    employeeLeaveAccount: IEmployeeLeaveAccount | (Partial<NewEmployeeLeaveAccount> & EmployeeLeaveAccountFormDefaults)
  ): EmployeeLeaveAccountFormRawValue | PartialWithRequiredKeyOf<NewEmployeeLeaveAccountFormRawValue> {
    return {
      ...employeeLeaveAccount,
      date: employeeLeaveAccount.date ? employeeLeaveAccount.date.format(DATE_TIME_FORMAT) : undefined,
      lastModified: employeeLeaveAccount.lastModified ? employeeLeaveAccount.lastModified.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
