import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { ICustomLeavePolicy, NewCustomLeavePolicy } from '../custom-leave-policy.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ICustomLeavePolicy for edit and NewCustomLeavePolicyFormGroupInput for create.
 */
type CustomLeavePolicyFormGroupInput = ICustomLeavePolicy | PartialWithRequiredKeyOf<NewCustomLeavePolicy>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends ICustomLeavePolicy | NewCustomLeavePolicy> = Omit<T, 'lastModified'> & {
  lastModified?: string | null;
};

type CustomLeavePolicyFormRawValue = FormValueOf<ICustomLeavePolicy>;

type NewCustomLeavePolicyFormRawValue = FormValueOf<NewCustomLeavePolicy>;

type CustomLeavePolicyFormDefaults = Pick<NewCustomLeavePolicy, 'id' | 'lastModified'>;

type CustomLeavePolicyFormGroupContent = {
  id: FormControl<CustomLeavePolicyFormRawValue['id'] | NewCustomLeavePolicy['id']>;
  leavePolicyId: FormControl<CustomLeavePolicyFormRawValue['leavePolicyId']>;
  employeeId: FormControl<CustomLeavePolicyFormRawValue['employeeId']>;
  days: FormControl<CustomLeavePolicyFormRawValue['days']>;
  companyId: FormControl<CustomLeavePolicyFormRawValue['companyId']>;
  status: FormControl<CustomLeavePolicyFormRawValue['status']>;
  lastModified: FormControl<CustomLeavePolicyFormRawValue['lastModified']>;
  lastModifiedBy: FormControl<CustomLeavePolicyFormRawValue['lastModifiedBy']>;
};

export type CustomLeavePolicyFormGroup = FormGroup<CustomLeavePolicyFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class CustomLeavePolicyFormService {
  createCustomLeavePolicyFormGroup(customLeavePolicy: CustomLeavePolicyFormGroupInput = { id: null }): CustomLeavePolicyFormGroup {
    const customLeavePolicyRawValue = this.convertCustomLeavePolicyToCustomLeavePolicyRawValue({
      ...this.getFormDefaults(),
      ...customLeavePolicy,
    });
    return new FormGroup<CustomLeavePolicyFormGroupContent>({
      id: new FormControl(
        { value: customLeavePolicyRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      leavePolicyId: new FormControl(customLeavePolicyRawValue.leavePolicyId),
      employeeId: new FormControl(customLeavePolicyRawValue.employeeId),
      days: new FormControl(customLeavePolicyRawValue.days),
      companyId: new FormControl(customLeavePolicyRawValue.companyId),
      status: new FormControl(customLeavePolicyRawValue.status),
      lastModified: new FormControl(customLeavePolicyRawValue.lastModified),
      lastModifiedBy: new FormControl(customLeavePolicyRawValue.lastModifiedBy),
    });
  }

  getCustomLeavePolicy(form: CustomLeavePolicyFormGroup): ICustomLeavePolicy | NewCustomLeavePolicy {
    return this.convertCustomLeavePolicyRawValueToCustomLeavePolicy(
      form.getRawValue() as CustomLeavePolicyFormRawValue | NewCustomLeavePolicyFormRawValue
    );
  }

  resetForm(form: CustomLeavePolicyFormGroup, customLeavePolicy: CustomLeavePolicyFormGroupInput): void {
    const customLeavePolicyRawValue = this.convertCustomLeavePolicyToCustomLeavePolicyRawValue({
      ...this.getFormDefaults(),
      ...customLeavePolicy,
    });
    form.reset(
      {
        ...customLeavePolicyRawValue,
        id: { value: customLeavePolicyRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): CustomLeavePolicyFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      lastModified: currentTime,
    };
  }

  private convertCustomLeavePolicyRawValueToCustomLeavePolicy(
    rawCustomLeavePolicy: CustomLeavePolicyFormRawValue | NewCustomLeavePolicyFormRawValue
  ): ICustomLeavePolicy | NewCustomLeavePolicy {
    return {
      ...rawCustomLeavePolicy,
      lastModified: dayjs(rawCustomLeavePolicy.lastModified, DATE_TIME_FORMAT),
    };
  }

  private convertCustomLeavePolicyToCustomLeavePolicyRawValue(
    customLeavePolicy: ICustomLeavePolicy | (Partial<NewCustomLeavePolicy> & CustomLeavePolicyFormDefaults)
  ): CustomLeavePolicyFormRawValue | PartialWithRequiredKeyOf<NewCustomLeavePolicyFormRawValue> {
    return {
      ...customLeavePolicy,
      lastModified: customLeavePolicy.lastModified ? customLeavePolicy.lastModified.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
