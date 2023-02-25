import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { ISalarySettings, NewSalarySettings } from '../salary-settings.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ISalarySettings for edit and NewSalarySettingsFormGroupInput for create.
 */
type SalarySettingsFormGroupInput = ISalarySettings | PartialWithRequiredKeyOf<NewSalarySettings>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends ISalarySettings | NewSalarySettings> = Omit<T, 'lastModified'> & {
  lastModified?: string | null;
};

type SalarySettingsFormRawValue = FormValueOf<ISalarySettings>;

type NewSalarySettingsFormRawValue = FormValueOf<NewSalarySettings>;

type SalarySettingsFormDefaults = Pick<NewSalarySettings, 'id' | 'lastModified'>;

type SalarySettingsFormGroupContent = {
  id: FormControl<SalarySettingsFormRawValue['id'] | NewSalarySettings['id']>;
  da: FormControl<SalarySettingsFormRawValue['da']>;
  hra: FormControl<SalarySettingsFormRawValue['hra']>;
  employeeShare: FormControl<SalarySettingsFormRawValue['employeeShare']>;
  companyShare: FormControl<SalarySettingsFormRawValue['companyShare']>;
  companyId: FormControl<SalarySettingsFormRawValue['companyId']>;
  status: FormControl<SalarySettingsFormRawValue['status']>;
  lastModified: FormControl<SalarySettingsFormRawValue['lastModified']>;
  lastModifiedBy: FormControl<SalarySettingsFormRawValue['lastModifiedBy']>;
};

export type SalarySettingsFormGroup = FormGroup<SalarySettingsFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class SalarySettingsFormService {
  createSalarySettingsFormGroup(salarySettings: SalarySettingsFormGroupInput = { id: null }): SalarySettingsFormGroup {
    const salarySettingsRawValue = this.convertSalarySettingsToSalarySettingsRawValue({
      ...this.getFormDefaults(),
      ...salarySettings,
    });
    return new FormGroup<SalarySettingsFormGroupContent>({
      id: new FormControl(
        { value: salarySettingsRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      da: new FormControl(salarySettingsRawValue.da),
      hra: new FormControl(salarySettingsRawValue.hra),
      employeeShare: new FormControl(salarySettingsRawValue.employeeShare),
      companyShare: new FormControl(salarySettingsRawValue.companyShare),
      companyId: new FormControl(salarySettingsRawValue.companyId),
      status: new FormControl(salarySettingsRawValue.status),
      lastModified: new FormControl(salarySettingsRawValue.lastModified),
      lastModifiedBy: new FormControl(salarySettingsRawValue.lastModifiedBy),
    });
  }

  getSalarySettings(form: SalarySettingsFormGroup): ISalarySettings | NewSalarySettings {
    return this.convertSalarySettingsRawValueToSalarySettings(
      form.getRawValue() as SalarySettingsFormRawValue | NewSalarySettingsFormRawValue
    );
  }

  resetForm(form: SalarySettingsFormGroup, salarySettings: SalarySettingsFormGroupInput): void {
    const salarySettingsRawValue = this.convertSalarySettingsToSalarySettingsRawValue({ ...this.getFormDefaults(), ...salarySettings });
    form.reset(
      {
        ...salarySettingsRawValue,
        id: { value: salarySettingsRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): SalarySettingsFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      lastModified: currentTime,
    };
  }

  private convertSalarySettingsRawValueToSalarySettings(
    rawSalarySettings: SalarySettingsFormRawValue | NewSalarySettingsFormRawValue
  ): ISalarySettings | NewSalarySettings {
    return {
      ...rawSalarySettings,
      lastModified: dayjs(rawSalarySettings.lastModified, DATE_TIME_FORMAT),
    };
  }

  private convertSalarySettingsToSalarySettingsRawValue(
    salarySettings: ISalarySettings | (Partial<NewSalarySettings> & SalarySettingsFormDefaults)
  ): SalarySettingsFormRawValue | PartialWithRequiredKeyOf<NewSalarySettingsFormRawValue> {
    return {
      ...salarySettings,
      lastModified: salarySettings.lastModified ? salarySettings.lastModified.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
