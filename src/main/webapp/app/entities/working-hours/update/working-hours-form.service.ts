import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IWorkingHours, NewWorkingHours } from '../working-hours.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IWorkingHours for edit and NewWorkingHoursFormGroupInput for create.
 */
type WorkingHoursFormGroupInput = IWorkingHours | PartialWithRequiredKeyOf<NewWorkingHours>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends IWorkingHours | NewWorkingHours> = Omit<T, 'lastModified'> & {
  lastModified?: string | null;
};

type WorkingHoursFormRawValue = FormValueOf<IWorkingHours>;

type NewWorkingHoursFormRawValue = FormValueOf<NewWorkingHours>;

type WorkingHoursFormDefaults = Pick<NewWorkingHours, 'id' | 'lastModified'>;

type WorkingHoursFormGroupContent = {
  id: FormControl<WorkingHoursFormRawValue['id'] | NewWorkingHours['id']>;
  noOfHours: FormControl<WorkingHoursFormRawValue['noOfHours']>;
  employmentTypeId: FormControl<WorkingHoursFormRawValue['employmentTypeId']>;
  companyId: FormControl<WorkingHoursFormRawValue['companyId']>;
  status: FormControl<WorkingHoursFormRawValue['status']>;
  lastModified: FormControl<WorkingHoursFormRawValue['lastModified']>;
  lastModifiedBy: FormControl<WorkingHoursFormRawValue['lastModifiedBy']>;
};

export type WorkingHoursFormGroup = FormGroup<WorkingHoursFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class WorkingHoursFormService {
  createWorkingHoursFormGroup(workingHours: WorkingHoursFormGroupInput = { id: null }): WorkingHoursFormGroup {
    const workingHoursRawValue = this.convertWorkingHoursToWorkingHoursRawValue({
      ...this.getFormDefaults(),
      ...workingHours,
    });
    return new FormGroup<WorkingHoursFormGroupContent>({
      id: new FormControl(
        { value: workingHoursRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      noOfHours: new FormControl(workingHoursRawValue.noOfHours),
      employmentTypeId: new FormControl(workingHoursRawValue.employmentTypeId),
      companyId: new FormControl(workingHoursRawValue.companyId),
      status: new FormControl(workingHoursRawValue.status),
      lastModified: new FormControl(workingHoursRawValue.lastModified),
      lastModifiedBy: new FormControl(workingHoursRawValue.lastModifiedBy),
    });
  }

  getWorkingHours(form: WorkingHoursFormGroup): IWorkingHours | NewWorkingHours {
    return this.convertWorkingHoursRawValueToWorkingHours(form.getRawValue() as WorkingHoursFormRawValue | NewWorkingHoursFormRawValue);
  }

  resetForm(form: WorkingHoursFormGroup, workingHours: WorkingHoursFormGroupInput): void {
    const workingHoursRawValue = this.convertWorkingHoursToWorkingHoursRawValue({ ...this.getFormDefaults(), ...workingHours });
    form.reset(
      {
        ...workingHoursRawValue,
        id: { value: workingHoursRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): WorkingHoursFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      lastModified: currentTime,
    };
  }

  private convertWorkingHoursRawValueToWorkingHours(
    rawWorkingHours: WorkingHoursFormRawValue | NewWorkingHoursFormRawValue
  ): IWorkingHours | NewWorkingHours {
    return {
      ...rawWorkingHours,
      lastModified: dayjs(rawWorkingHours.lastModified, DATE_TIME_FORMAT),
    };
  }

  private convertWorkingHoursToWorkingHoursRawValue(
    workingHours: IWorkingHours | (Partial<NewWorkingHours> & WorkingHoursFormDefaults)
  ): WorkingHoursFormRawValue | PartialWithRequiredKeyOf<NewWorkingHoursFormRawValue> {
    return {
      ...workingHours,
      lastModified: workingHours.lastModified ? workingHours.lastModified.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
