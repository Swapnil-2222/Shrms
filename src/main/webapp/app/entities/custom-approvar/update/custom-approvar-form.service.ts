import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { ICustomApprovar, NewCustomApprovar } from '../custom-approvar.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ICustomApprovar for edit and NewCustomApprovarFormGroupInput for create.
 */
type CustomApprovarFormGroupInput = ICustomApprovar | PartialWithRequiredKeyOf<NewCustomApprovar>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends ICustomApprovar | NewCustomApprovar> = Omit<T, 'lastModified'> & {
  lastModified?: string | null;
};

type CustomApprovarFormRawValue = FormValueOf<ICustomApprovar>;

type NewCustomApprovarFormRawValue = FormValueOf<NewCustomApprovar>;

type CustomApprovarFormDefaults = Pick<NewCustomApprovar, 'id' | 'lastModified'>;

type CustomApprovarFormGroupContent = {
  id: FormControl<CustomApprovarFormRawValue['id'] | NewCustomApprovar['id']>;
  employeId: FormControl<CustomApprovarFormRawValue['employeId']>;
  approvalSettingId: FormControl<CustomApprovarFormRawValue['approvalSettingId']>;
  squence: FormControl<CustomApprovarFormRawValue['squence']>;
  companyId: FormControl<CustomApprovarFormRawValue['companyId']>;
  status: FormControl<CustomApprovarFormRawValue['status']>;
  lastModified: FormControl<CustomApprovarFormRawValue['lastModified']>;
  lastModifiedBy: FormControl<CustomApprovarFormRawValue['lastModifiedBy']>;
};

export type CustomApprovarFormGroup = FormGroup<CustomApprovarFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class CustomApprovarFormService {
  createCustomApprovarFormGroup(customApprovar: CustomApprovarFormGroupInput = { id: null }): CustomApprovarFormGroup {
    const customApprovarRawValue = this.convertCustomApprovarToCustomApprovarRawValue({
      ...this.getFormDefaults(),
      ...customApprovar,
    });
    return new FormGroup<CustomApprovarFormGroupContent>({
      id: new FormControl(
        { value: customApprovarRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      employeId: new FormControl(customApprovarRawValue.employeId),
      approvalSettingId: new FormControl(customApprovarRawValue.approvalSettingId),
      squence: new FormControl(customApprovarRawValue.squence),
      companyId: new FormControl(customApprovarRawValue.companyId),
      status: new FormControl(customApprovarRawValue.status),
      lastModified: new FormControl(customApprovarRawValue.lastModified),
      lastModifiedBy: new FormControl(customApprovarRawValue.lastModifiedBy),
    });
  }

  getCustomApprovar(form: CustomApprovarFormGroup): ICustomApprovar | NewCustomApprovar {
    return this.convertCustomApprovarRawValueToCustomApprovar(
      form.getRawValue() as CustomApprovarFormRawValue | NewCustomApprovarFormRawValue
    );
  }

  resetForm(form: CustomApprovarFormGroup, customApprovar: CustomApprovarFormGroupInput): void {
    const customApprovarRawValue = this.convertCustomApprovarToCustomApprovarRawValue({ ...this.getFormDefaults(), ...customApprovar });
    form.reset(
      {
        ...customApprovarRawValue,
        id: { value: customApprovarRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): CustomApprovarFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      lastModified: currentTime,
    };
  }

  private convertCustomApprovarRawValueToCustomApprovar(
    rawCustomApprovar: CustomApprovarFormRawValue | NewCustomApprovarFormRawValue
  ): ICustomApprovar | NewCustomApprovar {
    return {
      ...rawCustomApprovar,
      lastModified: dayjs(rawCustomApprovar.lastModified, DATE_TIME_FORMAT),
    };
  }

  private convertCustomApprovarToCustomApprovarRawValue(
    customApprovar: ICustomApprovar | (Partial<NewCustomApprovar> & CustomApprovarFormDefaults)
  ): CustomApprovarFormRawValue | PartialWithRequiredKeyOf<NewCustomApprovarFormRawValue> {
    return {
      ...customApprovar,
      lastModified: customApprovar.lastModified ? customApprovar.lastModified.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
