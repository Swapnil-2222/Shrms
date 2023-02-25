import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IApprovalLevel, NewApprovalLevel } from '../approval-level.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IApprovalLevel for edit and NewApprovalLevelFormGroupInput for create.
 */
type ApprovalLevelFormGroupInput = IApprovalLevel | PartialWithRequiredKeyOf<NewApprovalLevel>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends IApprovalLevel | NewApprovalLevel> = Omit<T, 'lastModified'> & {
  lastModified?: string | null;
};

type ApprovalLevelFormRawValue = FormValueOf<IApprovalLevel>;

type NewApprovalLevelFormRawValue = FormValueOf<NewApprovalLevel>;

type ApprovalLevelFormDefaults = Pick<NewApprovalLevel, 'id' | 'lastModified'>;

type ApprovalLevelFormGroupContent = {
  id: FormControl<ApprovalLevelFormRawValue['id'] | NewApprovalLevel['id']>;
  name: FormControl<ApprovalLevelFormRawValue['name']>;
  squence: FormControl<ApprovalLevelFormRawValue['squence']>;
  approvalSettingId: FormControl<ApprovalLevelFormRawValue['approvalSettingId']>;
  companyId: FormControl<ApprovalLevelFormRawValue['companyId']>;
  status: FormControl<ApprovalLevelFormRawValue['status']>;
  lastModified: FormControl<ApprovalLevelFormRawValue['lastModified']>;
  lastModifiedBy: FormControl<ApprovalLevelFormRawValue['lastModifiedBy']>;
};

export type ApprovalLevelFormGroup = FormGroup<ApprovalLevelFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class ApprovalLevelFormService {
  createApprovalLevelFormGroup(approvalLevel: ApprovalLevelFormGroupInput = { id: null }): ApprovalLevelFormGroup {
    const approvalLevelRawValue = this.convertApprovalLevelToApprovalLevelRawValue({
      ...this.getFormDefaults(),
      ...approvalLevel,
    });
    return new FormGroup<ApprovalLevelFormGroupContent>({
      id: new FormControl(
        { value: approvalLevelRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      name: new FormControl(approvalLevelRawValue.name),
      squence: new FormControl(approvalLevelRawValue.squence),
      approvalSettingId: new FormControl(approvalLevelRawValue.approvalSettingId),
      companyId: new FormControl(approvalLevelRawValue.companyId),
      status: new FormControl(approvalLevelRawValue.status),
      lastModified: new FormControl(approvalLevelRawValue.lastModified),
      lastModifiedBy: new FormControl(approvalLevelRawValue.lastModifiedBy),
    });
  }

  getApprovalLevel(form: ApprovalLevelFormGroup): IApprovalLevel | NewApprovalLevel {
    return this.convertApprovalLevelRawValueToApprovalLevel(form.getRawValue() as ApprovalLevelFormRawValue | NewApprovalLevelFormRawValue);
  }

  resetForm(form: ApprovalLevelFormGroup, approvalLevel: ApprovalLevelFormGroupInput): void {
    const approvalLevelRawValue = this.convertApprovalLevelToApprovalLevelRawValue({ ...this.getFormDefaults(), ...approvalLevel });
    form.reset(
      {
        ...approvalLevelRawValue,
        id: { value: approvalLevelRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): ApprovalLevelFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      lastModified: currentTime,
    };
  }

  private convertApprovalLevelRawValueToApprovalLevel(
    rawApprovalLevel: ApprovalLevelFormRawValue | NewApprovalLevelFormRawValue
  ): IApprovalLevel | NewApprovalLevel {
    return {
      ...rawApprovalLevel,
      lastModified: dayjs(rawApprovalLevel.lastModified, DATE_TIME_FORMAT),
    };
  }

  private convertApprovalLevelToApprovalLevelRawValue(
    approvalLevel: IApprovalLevel | (Partial<NewApprovalLevel> & ApprovalLevelFormDefaults)
  ): ApprovalLevelFormRawValue | PartialWithRequiredKeyOf<NewApprovalLevelFormRawValue> {
    return {
      ...approvalLevel,
      lastModified: approvalLevel.lastModified ? approvalLevel.lastModified.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
