import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IApprovalSetting, NewApprovalSetting } from '../approval-setting.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IApprovalSetting for edit and NewApprovalSettingFormGroupInput for create.
 */
type ApprovalSettingFormGroupInput = IApprovalSetting | PartialWithRequiredKeyOf<NewApprovalSetting>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends IApprovalSetting | NewApprovalSetting> = Omit<T, 'lastModified'> & {
  lastModified?: string | null;
};

type ApprovalSettingFormRawValue = FormValueOf<IApprovalSetting>;

type NewApprovalSettingFormRawValue = FormValueOf<NewApprovalSetting>;

type ApprovalSettingFormDefaults = Pick<NewApprovalSetting, 'id' | 'lastModified'>;

type ApprovalSettingFormGroupContent = {
  id: FormControl<ApprovalSettingFormRawValue['id'] | NewApprovalSetting['id']>;
  type: FormControl<ApprovalSettingFormRawValue['type']>;
  approvalCategory: FormControl<ApprovalSettingFormRawValue['approvalCategory']>;
  companyId: FormControl<ApprovalSettingFormRawValue['companyId']>;
  status: FormControl<ApprovalSettingFormRawValue['status']>;
  lastModified: FormControl<ApprovalSettingFormRawValue['lastModified']>;
  lastModifiedBy: FormControl<ApprovalSettingFormRawValue['lastModifiedBy']>;
};

export type ApprovalSettingFormGroup = FormGroup<ApprovalSettingFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class ApprovalSettingFormService {
  createApprovalSettingFormGroup(approvalSetting: ApprovalSettingFormGroupInput = { id: null }): ApprovalSettingFormGroup {
    const approvalSettingRawValue = this.convertApprovalSettingToApprovalSettingRawValue({
      ...this.getFormDefaults(),
      ...approvalSetting,
    });
    return new FormGroup<ApprovalSettingFormGroupContent>({
      id: new FormControl(
        { value: approvalSettingRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      type: new FormControl(approvalSettingRawValue.type),
      approvalCategory: new FormControl(approvalSettingRawValue.approvalCategory),
      companyId: new FormControl(approvalSettingRawValue.companyId),
      status: new FormControl(approvalSettingRawValue.status),
      lastModified: new FormControl(approvalSettingRawValue.lastModified),
      lastModifiedBy: new FormControl(approvalSettingRawValue.lastModifiedBy),
    });
  }

  getApprovalSetting(form: ApprovalSettingFormGroup): IApprovalSetting | NewApprovalSetting {
    return this.convertApprovalSettingRawValueToApprovalSetting(
      form.getRawValue() as ApprovalSettingFormRawValue | NewApprovalSettingFormRawValue
    );
  }

  resetForm(form: ApprovalSettingFormGroup, approvalSetting: ApprovalSettingFormGroupInput): void {
    const approvalSettingRawValue = this.convertApprovalSettingToApprovalSettingRawValue({ ...this.getFormDefaults(), ...approvalSetting });
    form.reset(
      {
        ...approvalSettingRawValue,
        id: { value: approvalSettingRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): ApprovalSettingFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      lastModified: currentTime,
    };
  }

  private convertApprovalSettingRawValueToApprovalSetting(
    rawApprovalSetting: ApprovalSettingFormRawValue | NewApprovalSettingFormRawValue
  ): IApprovalSetting | NewApprovalSetting {
    return {
      ...rawApprovalSetting,
      lastModified: dayjs(rawApprovalSetting.lastModified, DATE_TIME_FORMAT),
    };
  }

  private convertApprovalSettingToApprovalSettingRawValue(
    approvalSetting: IApprovalSetting | (Partial<NewApprovalSetting> & ApprovalSettingFormDefaults)
  ): ApprovalSettingFormRawValue | PartialWithRequiredKeyOf<NewApprovalSettingFormRawValue> {
    return {
      ...approvalSetting,
      lastModified: approvalSetting.lastModified ? approvalSetting.lastModified.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
