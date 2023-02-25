import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { ILeaveType, NewLeaveType } from '../leave-type.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ILeaveType for edit and NewLeaveTypeFormGroupInput for create.
 */
type LeaveTypeFormGroupInput = ILeaveType | PartialWithRequiredKeyOf<NewLeaveType>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends ILeaveType | NewLeaveType> = Omit<T, 'lastModified'> & {
  lastModified?: string | null;
};

type LeaveTypeFormRawValue = FormValueOf<ILeaveType>;

type NewLeaveTypeFormRawValue = FormValueOf<NewLeaveType>;

type LeaveTypeFormDefaults = Pick<NewLeaveType, 'id' | 'lastModified' | 'hasCarryForward' | 'hasEarned' | 'hasCustomPolicy'>;

type LeaveTypeFormGroupContent = {
  id: FormControl<LeaveTypeFormRawValue['id'] | NewLeaveType['id']>;
  leaveType: FormControl<LeaveTypeFormRawValue['leaveType']>;
  noOfDays: FormControl<LeaveTypeFormRawValue['noOfDays']>;
  companyId: FormControl<LeaveTypeFormRawValue['companyId']>;
  status: FormControl<LeaveTypeFormRawValue['status']>;
  lastModified: FormControl<LeaveTypeFormRawValue['lastModified']>;
  lastModifiedBy: FormControl<LeaveTypeFormRawValue['lastModifiedBy']>;
  hasCarryForward: FormControl<LeaveTypeFormRawValue['hasCarryForward']>;
  hasEarned: FormControl<LeaveTypeFormRawValue['hasEarned']>;
  hasCustomPolicy: FormControl<LeaveTypeFormRawValue['hasCustomPolicy']>;
};

export type LeaveTypeFormGroup = FormGroup<LeaveTypeFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class LeaveTypeFormService {
  createLeaveTypeFormGroup(leaveType: LeaveTypeFormGroupInput = { id: null }): LeaveTypeFormGroup {
    const leaveTypeRawValue = this.convertLeaveTypeToLeaveTypeRawValue({
      ...this.getFormDefaults(),
      ...leaveType,
    });
    return new FormGroup<LeaveTypeFormGroupContent>({
      id: new FormControl(
        { value: leaveTypeRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      leaveType: new FormControl(leaveTypeRawValue.leaveType),
      noOfDays: new FormControl(leaveTypeRawValue.noOfDays),
      companyId: new FormControl(leaveTypeRawValue.companyId),
      status: new FormControl(leaveTypeRawValue.status),
      lastModified: new FormControl(leaveTypeRawValue.lastModified),
      lastModifiedBy: new FormControl(leaveTypeRawValue.lastModifiedBy),
      hasCarryForward: new FormControl(leaveTypeRawValue.hasCarryForward),
      hasEarned: new FormControl(leaveTypeRawValue.hasEarned),
      hasCustomPolicy: new FormControl(leaveTypeRawValue.hasCustomPolicy),
    });
  }

  getLeaveType(form: LeaveTypeFormGroup): ILeaveType | NewLeaveType {
    return this.convertLeaveTypeRawValueToLeaveType(form.getRawValue() as LeaveTypeFormRawValue | NewLeaveTypeFormRawValue);
  }

  resetForm(form: LeaveTypeFormGroup, leaveType: LeaveTypeFormGroupInput): void {
    const leaveTypeRawValue = this.convertLeaveTypeToLeaveTypeRawValue({ ...this.getFormDefaults(), ...leaveType });
    form.reset(
      {
        ...leaveTypeRawValue,
        id: { value: leaveTypeRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): LeaveTypeFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      lastModified: currentTime,
      hasCarryForward: false,
      hasEarned: false,
      hasCustomPolicy: false,
    };
  }

  private convertLeaveTypeRawValueToLeaveType(rawLeaveType: LeaveTypeFormRawValue | NewLeaveTypeFormRawValue): ILeaveType | NewLeaveType {
    return {
      ...rawLeaveType,
      lastModified: dayjs(rawLeaveType.lastModified, DATE_TIME_FORMAT),
    };
  }

  private convertLeaveTypeToLeaveTypeRawValue(
    leaveType: ILeaveType | (Partial<NewLeaveType> & LeaveTypeFormDefaults)
  ): LeaveTypeFormRawValue | PartialWithRequiredKeyOf<NewLeaveTypeFormRawValue> {
    return {
      ...leaveType,
      lastModified: leaveType.lastModified ? leaveType.lastModified.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
