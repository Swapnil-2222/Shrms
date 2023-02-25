import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IWorkDaysSetting, NewWorkDaysSetting } from '../work-days-setting.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IWorkDaysSetting for edit and NewWorkDaysSettingFormGroupInput for create.
 */
type WorkDaysSettingFormGroupInput = IWorkDaysSetting | PartialWithRequiredKeyOf<NewWorkDaysSetting>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends IWorkDaysSetting | NewWorkDaysSetting> = Omit<T, 'lastModified'> & {
  lastModified?: string | null;
};

type WorkDaysSettingFormRawValue = FormValueOf<IWorkDaysSetting>;

type NewWorkDaysSettingFormRawValue = FormValueOf<NewWorkDaysSetting>;

type WorkDaysSettingFormDefaults = Pick<NewWorkDaysSetting, 'id' | 'dayOff' | 'lastModified'>;

type WorkDaysSettingFormGroupContent = {
  id: FormControl<WorkDaysSettingFormRawValue['id'] | NewWorkDaysSetting['id']>;
  day: FormControl<WorkDaysSettingFormRawValue['day']>;
  hours: FormControl<WorkDaysSettingFormRawValue['hours']>;
  dayOff: FormControl<WorkDaysSettingFormRawValue['dayOff']>;
  companyId: FormControl<WorkDaysSettingFormRawValue['companyId']>;
  status: FormControl<WorkDaysSettingFormRawValue['status']>;
  lastModified: FormControl<WorkDaysSettingFormRawValue['lastModified']>;
  lastModifiedBy: FormControl<WorkDaysSettingFormRawValue['lastModifiedBy']>;
};

export type WorkDaysSettingFormGroup = FormGroup<WorkDaysSettingFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class WorkDaysSettingFormService {
  createWorkDaysSettingFormGroup(workDaysSetting: WorkDaysSettingFormGroupInput = { id: null }): WorkDaysSettingFormGroup {
    const workDaysSettingRawValue = this.convertWorkDaysSettingToWorkDaysSettingRawValue({
      ...this.getFormDefaults(),
      ...workDaysSetting,
    });
    return new FormGroup<WorkDaysSettingFormGroupContent>({
      id: new FormControl(
        { value: workDaysSettingRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      day: new FormControl(workDaysSettingRawValue.day),
      hours: new FormControl(workDaysSettingRawValue.hours),
      dayOff: new FormControl(workDaysSettingRawValue.dayOff),
      companyId: new FormControl(workDaysSettingRawValue.companyId),
      status: new FormControl(workDaysSettingRawValue.status),
      lastModified: new FormControl(workDaysSettingRawValue.lastModified),
      lastModifiedBy: new FormControl(workDaysSettingRawValue.lastModifiedBy),
    });
  }

  getWorkDaysSetting(form: WorkDaysSettingFormGroup): IWorkDaysSetting | NewWorkDaysSetting {
    return this.convertWorkDaysSettingRawValueToWorkDaysSetting(
      form.getRawValue() as WorkDaysSettingFormRawValue | NewWorkDaysSettingFormRawValue
    );
  }

  resetForm(form: WorkDaysSettingFormGroup, workDaysSetting: WorkDaysSettingFormGroupInput): void {
    const workDaysSettingRawValue = this.convertWorkDaysSettingToWorkDaysSettingRawValue({ ...this.getFormDefaults(), ...workDaysSetting });
    form.reset(
      {
        ...workDaysSettingRawValue,
        id: { value: workDaysSettingRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): WorkDaysSettingFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      dayOff: false,
      lastModified: currentTime,
    };
  }

  private convertWorkDaysSettingRawValueToWorkDaysSetting(
    rawWorkDaysSetting: WorkDaysSettingFormRawValue | NewWorkDaysSettingFormRawValue
  ): IWorkDaysSetting | NewWorkDaysSetting {
    return {
      ...rawWorkDaysSetting,
      lastModified: dayjs(rawWorkDaysSetting.lastModified, DATE_TIME_FORMAT),
    };
  }

  private convertWorkDaysSettingToWorkDaysSettingRawValue(
    workDaysSetting: IWorkDaysSetting | (Partial<NewWorkDaysSetting> & WorkDaysSettingFormDefaults)
  ): WorkDaysSettingFormRawValue | PartialWithRequiredKeyOf<NewWorkDaysSettingFormRawValue> {
    return {
      ...workDaysSetting,
      lastModified: workDaysSetting.lastModified ? workDaysSetting.lastModified.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
