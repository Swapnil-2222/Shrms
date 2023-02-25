import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IEmploymentType, NewEmploymentType } from '../employment-type.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IEmploymentType for edit and NewEmploymentTypeFormGroupInput for create.
 */
type EmploymentTypeFormGroupInput = IEmploymentType | PartialWithRequiredKeyOf<NewEmploymentType>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends IEmploymentType | NewEmploymentType> = Omit<T, 'lastModified'> & {
  lastModified?: string | null;
};

type EmploymentTypeFormRawValue = FormValueOf<IEmploymentType>;

type NewEmploymentTypeFormRawValue = FormValueOf<NewEmploymentType>;

type EmploymentTypeFormDefaults = Pick<NewEmploymentType, 'id' | 'lastModified'>;

type EmploymentTypeFormGroupContent = {
  id: FormControl<EmploymentTypeFormRawValue['id'] | NewEmploymentType['id']>;
  name: FormControl<EmploymentTypeFormRawValue['name']>;
  subtype: FormControl<EmploymentTypeFormRawValue['subtype']>;
  companyId: FormControl<EmploymentTypeFormRawValue['companyId']>;
  status: FormControl<EmploymentTypeFormRawValue['status']>;
  lastModified: FormControl<EmploymentTypeFormRawValue['lastModified']>;
  lastModifiedBy: FormControl<EmploymentTypeFormRawValue['lastModifiedBy']>;
};

export type EmploymentTypeFormGroup = FormGroup<EmploymentTypeFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class EmploymentTypeFormService {
  createEmploymentTypeFormGroup(employmentType: EmploymentTypeFormGroupInput = { id: null }): EmploymentTypeFormGroup {
    const employmentTypeRawValue = this.convertEmploymentTypeToEmploymentTypeRawValue({
      ...this.getFormDefaults(),
      ...employmentType,
    });
    return new FormGroup<EmploymentTypeFormGroupContent>({
      id: new FormControl(
        { value: employmentTypeRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      name: new FormControl(employmentTypeRawValue.name),
      subtype: new FormControl(employmentTypeRawValue.subtype),
      companyId: new FormControl(employmentTypeRawValue.companyId),
      status: new FormControl(employmentTypeRawValue.status),
      lastModified: new FormControl(employmentTypeRawValue.lastModified),
      lastModifiedBy: new FormControl(employmentTypeRawValue.lastModifiedBy),
    });
  }

  getEmploymentType(form: EmploymentTypeFormGroup): IEmploymentType | NewEmploymentType {
    return this.convertEmploymentTypeRawValueToEmploymentType(
      form.getRawValue() as EmploymentTypeFormRawValue | NewEmploymentTypeFormRawValue
    );
  }

  resetForm(form: EmploymentTypeFormGroup, employmentType: EmploymentTypeFormGroupInput): void {
    const employmentTypeRawValue = this.convertEmploymentTypeToEmploymentTypeRawValue({ ...this.getFormDefaults(), ...employmentType });
    form.reset(
      {
        ...employmentTypeRawValue,
        id: { value: employmentTypeRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): EmploymentTypeFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      lastModified: currentTime,
    };
  }

  private convertEmploymentTypeRawValueToEmploymentType(
    rawEmploymentType: EmploymentTypeFormRawValue | NewEmploymentTypeFormRawValue
  ): IEmploymentType | NewEmploymentType {
    return {
      ...rawEmploymentType,
      lastModified: dayjs(rawEmploymentType.lastModified, DATE_TIME_FORMAT),
    };
  }

  private convertEmploymentTypeToEmploymentTypeRawValue(
    employmentType: IEmploymentType | (Partial<NewEmploymentType> & EmploymentTypeFormDefaults)
  ): EmploymentTypeFormRawValue | PartialWithRequiredKeyOf<NewEmploymentTypeFormRawValue> {
    return {
      ...employmentType,
      lastModified: employmentType.lastModified ? employmentType.lastModified.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
