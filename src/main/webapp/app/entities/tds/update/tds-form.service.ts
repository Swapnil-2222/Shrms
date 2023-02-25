import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { ITds, NewTds } from '../tds.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ITds for edit and NewTdsFormGroupInput for create.
 */
type TdsFormGroupInput = ITds | PartialWithRequiredKeyOf<NewTds>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends ITds | NewTds> = Omit<T, 'salaryFrom' | 'salaryTo' | 'lastModified'> & {
  salaryFrom?: string | null;
  salaryTo?: string | null;
  lastModified?: string | null;
};

type TdsFormRawValue = FormValueOf<ITds>;

type NewTdsFormRawValue = FormValueOf<NewTds>;

type TdsFormDefaults = Pick<NewTds, 'id' | 'salaryFrom' | 'salaryTo' | 'lastModified'>;

type TdsFormGroupContent = {
  id: FormControl<TdsFormRawValue['id'] | NewTds['id']>;
  salaryFrom: FormControl<TdsFormRawValue['salaryFrom']>;
  salaryTo: FormControl<TdsFormRawValue['salaryTo']>;
  percentage: FormControl<TdsFormRawValue['percentage']>;
  salarySettingId: FormControl<TdsFormRawValue['salarySettingId']>;
  companyId: FormControl<TdsFormRawValue['companyId']>;
  status: FormControl<TdsFormRawValue['status']>;
  lastModified: FormControl<TdsFormRawValue['lastModified']>;
  lastModifiedBy: FormControl<TdsFormRawValue['lastModifiedBy']>;
};

export type TdsFormGroup = FormGroup<TdsFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class TdsFormService {
  createTdsFormGroup(tds: TdsFormGroupInput = { id: null }): TdsFormGroup {
    const tdsRawValue = this.convertTdsToTdsRawValue({
      ...this.getFormDefaults(),
      ...tds,
    });
    return new FormGroup<TdsFormGroupContent>({
      id: new FormControl(
        { value: tdsRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      salaryFrom: new FormControl(tdsRawValue.salaryFrom),
      salaryTo: new FormControl(tdsRawValue.salaryTo),
      percentage: new FormControl(tdsRawValue.percentage),
      salarySettingId: new FormControl(tdsRawValue.salarySettingId),
      companyId: new FormControl(tdsRawValue.companyId),
      status: new FormControl(tdsRawValue.status),
      lastModified: new FormControl(tdsRawValue.lastModified),
      lastModifiedBy: new FormControl(tdsRawValue.lastModifiedBy),
    });
  }

  getTds(form: TdsFormGroup): ITds | NewTds {
    return this.convertTdsRawValueToTds(form.getRawValue() as TdsFormRawValue | NewTdsFormRawValue);
  }

  resetForm(form: TdsFormGroup, tds: TdsFormGroupInput): void {
    const tdsRawValue = this.convertTdsToTdsRawValue({ ...this.getFormDefaults(), ...tds });
    form.reset(
      {
        ...tdsRawValue,
        id: { value: tdsRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): TdsFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      salaryFrom: currentTime,
      salaryTo: currentTime,
      lastModified: currentTime,
    };
  }

  private convertTdsRawValueToTds(rawTds: TdsFormRawValue | NewTdsFormRawValue): ITds | NewTds {
    return {
      ...rawTds,
      salaryFrom: dayjs(rawTds.salaryFrom, DATE_TIME_FORMAT),
      salaryTo: dayjs(rawTds.salaryTo, DATE_TIME_FORMAT),
      lastModified: dayjs(rawTds.lastModified, DATE_TIME_FORMAT),
    };
  }

  private convertTdsToTdsRawValue(
    tds: ITds | (Partial<NewTds> & TdsFormDefaults)
  ): TdsFormRawValue | PartialWithRequiredKeyOf<NewTdsFormRawValue> {
    return {
      ...tds,
      salaryFrom: tds.salaryFrom ? tds.salaryFrom.format(DATE_TIME_FORMAT) : undefined,
      salaryTo: tds.salaryTo ? tds.salaryTo.format(DATE_TIME_FORMAT) : undefined,
      lastModified: tds.lastModified ? tds.lastModified.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
