import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IBanksDetails, NewBanksDetails } from '../banks-details.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IBanksDetails for edit and NewBanksDetailsFormGroupInput for create.
 */
type BanksDetailsFormGroupInput = IBanksDetails | PartialWithRequiredKeyOf<NewBanksDetails>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends IBanksDetails | NewBanksDetails> = Omit<T, 'lastModified'> & {
  lastModified?: string | null;
};

type BanksDetailsFormRawValue = FormValueOf<IBanksDetails>;

type NewBanksDetailsFormRawValue = FormValueOf<NewBanksDetails>;

type BanksDetailsFormDefaults = Pick<NewBanksDetails, 'id' | 'lastModified'>;

type BanksDetailsFormGroupContent = {
  id: FormControl<BanksDetailsFormRawValue['id'] | NewBanksDetails['id']>;
  accountNumber: FormControl<BanksDetailsFormRawValue['accountNumber']>;
  bankName: FormControl<BanksDetailsFormRawValue['bankName']>;
  branchTransCode: FormControl<BanksDetailsFormRawValue['branchTransCode']>;
  taxNumber: FormControl<BanksDetailsFormRawValue['taxNumber']>;
  gstin: FormControl<BanksDetailsFormRawValue['gstin']>;
  tan: FormControl<BanksDetailsFormRawValue['tan']>;
  branchName: FormControl<BanksDetailsFormRawValue['branchName']>;
  refTable: FormControl<BanksDetailsFormRawValue['refTable']>;
  refTableId: FormControl<BanksDetailsFormRawValue['refTableId']>;
  companyId: FormControl<BanksDetailsFormRawValue['companyId']>;
  status: FormControl<BanksDetailsFormRawValue['status']>;
  lastModified: FormControl<BanksDetailsFormRawValue['lastModified']>;
  lastModifiedBy: FormControl<BanksDetailsFormRawValue['lastModifiedBy']>;
};

export type BanksDetailsFormGroup = FormGroup<BanksDetailsFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class BanksDetailsFormService {
  createBanksDetailsFormGroup(banksDetails: BanksDetailsFormGroupInput = { id: null }): BanksDetailsFormGroup {
    const banksDetailsRawValue = this.convertBanksDetailsToBanksDetailsRawValue({
      ...this.getFormDefaults(),
      ...banksDetails,
    });
    return new FormGroup<BanksDetailsFormGroupContent>({
      id: new FormControl(
        { value: banksDetailsRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      accountNumber: new FormControl(banksDetailsRawValue.accountNumber),
      bankName: new FormControl(banksDetailsRawValue.bankName),
      branchTransCode: new FormControl(banksDetailsRawValue.branchTransCode),
      taxNumber: new FormControl(banksDetailsRawValue.taxNumber),
      gstin: new FormControl(banksDetailsRawValue.gstin),
      tan: new FormControl(banksDetailsRawValue.tan),
      branchName: new FormControl(banksDetailsRawValue.branchName),
      refTable: new FormControl(banksDetailsRawValue.refTable),
      refTableId: new FormControl(banksDetailsRawValue.refTableId),
      companyId: new FormControl(banksDetailsRawValue.companyId),
      status: new FormControl(banksDetailsRawValue.status),
      lastModified: new FormControl(banksDetailsRawValue.lastModified),
      lastModifiedBy: new FormControl(banksDetailsRawValue.lastModifiedBy),
    });
  }

  getBanksDetails(form: BanksDetailsFormGroup): IBanksDetails | NewBanksDetails {
    return this.convertBanksDetailsRawValueToBanksDetails(form.getRawValue() as BanksDetailsFormRawValue | NewBanksDetailsFormRawValue);
  }

  resetForm(form: BanksDetailsFormGroup, banksDetails: BanksDetailsFormGroupInput): void {
    const banksDetailsRawValue = this.convertBanksDetailsToBanksDetailsRawValue({ ...this.getFormDefaults(), ...banksDetails });
    form.reset(
      {
        ...banksDetailsRawValue,
        id: { value: banksDetailsRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): BanksDetailsFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      lastModified: currentTime,
    };
  }

  private convertBanksDetailsRawValueToBanksDetails(
    rawBanksDetails: BanksDetailsFormRawValue | NewBanksDetailsFormRawValue
  ): IBanksDetails | NewBanksDetails {
    return {
      ...rawBanksDetails,
      lastModified: dayjs(rawBanksDetails.lastModified, DATE_TIME_FORMAT),
    };
  }

  private convertBanksDetailsToBanksDetailsRawValue(
    banksDetails: IBanksDetails | (Partial<NewBanksDetails> & BanksDetailsFormDefaults)
  ): BanksDetailsFormRawValue | PartialWithRequiredKeyOf<NewBanksDetailsFormRawValue> {
    return {
      ...banksDetails,
      lastModified: banksDetails.lastModified ? banksDetails.lastModified.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
