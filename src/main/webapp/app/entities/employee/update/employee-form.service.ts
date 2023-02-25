import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IEmployee, NewEmployee } from '../employee.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IEmployee for edit and NewEmployeeFormGroupInput for create.
 */
type EmployeeFormGroupInput = IEmployee | PartialWithRequiredKeyOf<NewEmployee>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends IEmployee | NewEmployee> = Omit<T, 'joindate' | 'lastModified'> & {
  joindate?: string | null;
  lastModified?: string | null;
};

type EmployeeFormRawValue = FormValueOf<IEmployee>;

type NewEmployeeFormRawValue = FormValueOf<NewEmployee>;

type EmployeeFormDefaults = Pick<NewEmployee, 'id' | 'joindate' | 'lastModified'>;

type EmployeeFormGroupContent = {
  id: FormControl<EmployeeFormRawValue['id'] | NewEmployee['id']>;
  firstName: FormControl<EmployeeFormRawValue['firstName']>;
  middleName: FormControl<EmployeeFormRawValue['middleName']>;
  lastName: FormControl<EmployeeFormRawValue['lastName']>;
  department: FormControl<EmployeeFormRawValue['department']>;
  designation: FormControl<EmployeeFormRawValue['designation']>;
  gender: FormControl<EmployeeFormRawValue['gender']>;
  empUniqueId: FormControl<EmployeeFormRawValue['empUniqueId']>;
  joindate: FormControl<EmployeeFormRawValue['joindate']>;
  companyId: FormControl<EmployeeFormRawValue['companyId']>;
  branchId: FormControl<EmployeeFormRawValue['branchId']>;
  regionId: FormControl<EmployeeFormRawValue['regionId']>;
  status: FormControl<EmployeeFormRawValue['status']>;
  lastModified: FormControl<EmployeeFormRawValue['lastModified']>;
  lastModifiedBy: FormControl<EmployeeFormRawValue['lastModifiedBy']>;
  employmentTypeId: FormControl<EmployeeFormRawValue['employmentTypeId']>;
};

export type EmployeeFormGroup = FormGroup<EmployeeFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class EmployeeFormService {
  createEmployeeFormGroup(employee: EmployeeFormGroupInput = { id: null }): EmployeeFormGroup {
    const employeeRawValue = this.convertEmployeeToEmployeeRawValue({
      ...this.getFormDefaults(),
      ...employee,
    });
    return new FormGroup<EmployeeFormGroupContent>({
      id: new FormControl(
        { value: employeeRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      firstName: new FormControl(employeeRawValue.firstName),
      middleName: new FormControl(employeeRawValue.middleName),
      lastName: new FormControl(employeeRawValue.lastName),
      department: new FormControl(employeeRawValue.department),
      designation: new FormControl(employeeRawValue.designation),
      gender: new FormControl(employeeRawValue.gender),
      empUniqueId: new FormControl(employeeRawValue.empUniqueId, {
        validators: [Validators.required],
      }),
      joindate: new FormControl(employeeRawValue.joindate),
      companyId: new FormControl(employeeRawValue.companyId),
      branchId: new FormControl(employeeRawValue.branchId),
      regionId: new FormControl(employeeRawValue.regionId),
      status: new FormControl(employeeRawValue.status),
      lastModified: new FormControl(employeeRawValue.lastModified),
      lastModifiedBy: new FormControl(employeeRawValue.lastModifiedBy),
      employmentTypeId: new FormControl(employeeRawValue.employmentTypeId),
    });
  }

  getEmployee(form: EmployeeFormGroup): IEmployee | NewEmployee {
    return this.convertEmployeeRawValueToEmployee(form.getRawValue() as EmployeeFormRawValue | NewEmployeeFormRawValue);
  }

  resetForm(form: EmployeeFormGroup, employee: EmployeeFormGroupInput): void {
    const employeeRawValue = this.convertEmployeeToEmployeeRawValue({ ...this.getFormDefaults(), ...employee });
    form.reset(
      {
        ...employeeRawValue,
        id: { value: employeeRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): EmployeeFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      joindate: currentTime,
      lastModified: currentTime,
    };
  }

  private convertEmployeeRawValueToEmployee(rawEmployee: EmployeeFormRawValue | NewEmployeeFormRawValue): IEmployee | NewEmployee {
    return {
      ...rawEmployee,
      joindate: dayjs(rawEmployee.joindate, DATE_TIME_FORMAT),
      lastModified: dayjs(rawEmployee.lastModified, DATE_TIME_FORMAT),
    };
  }

  private convertEmployeeToEmployeeRawValue(
    employee: IEmployee | (Partial<NewEmployee> & EmployeeFormDefaults)
  ): EmployeeFormRawValue | PartialWithRequiredKeyOf<NewEmployeeFormRawValue> {
    return {
      ...employee,
      joindate: employee.joindate ? employee.joindate.format(DATE_TIME_FORMAT) : undefined,
      lastModified: employee.lastModified ? employee.lastModified.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
