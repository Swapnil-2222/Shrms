import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IEsiDetails, NewEsiDetails } from '../esi-details.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IEsiDetails for edit and NewEsiDetailsFormGroupInput for create.
 */
type EsiDetailsFormGroupInput = IEsiDetails | PartialWithRequiredKeyOf<NewEsiDetails>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends IEsiDetails | NewEsiDetails> = Omit<T, 'lastModified'> & {
  lastModified?: string | null;
};

type EsiDetailsFormRawValue = FormValueOf<IEsiDetails>;

type NewEsiDetailsFormRawValue = FormValueOf<NewEsiDetails>;

type EsiDetailsFormDefaults = Pick<NewEsiDetails, 'id' | 'isEsiContribution' | 'lastModified'>;

type EsiDetailsFormGroupContent = {
  id: FormControl<EsiDetailsFormRawValue['id'] | NewEsiDetails['id']>;
  isEsiContribution: FormControl<EsiDetailsFormRawValue['isEsiContribution']>;
  esiNumber: FormControl<EsiDetailsFormRawValue['esiNumber']>;
  esiRate: FormControl<EsiDetailsFormRawValue['esiRate']>;
  additionalEsiRate: FormControl<EsiDetailsFormRawValue['additionalEsiRate']>;
  totalEsiRate: FormControl<EsiDetailsFormRawValue['totalEsiRate']>;
  employeId: FormControl<EsiDetailsFormRawValue['employeId']>;
  reEnumerationId: FormControl<EsiDetailsFormRawValue['reEnumerationId']>;
  companyId: FormControl<EsiDetailsFormRawValue['companyId']>;
  status: FormControl<EsiDetailsFormRawValue['status']>;
  lastModified: FormControl<EsiDetailsFormRawValue['lastModified']>;
  lastModifiedBy: FormControl<EsiDetailsFormRawValue['lastModifiedBy']>;
};

export type EsiDetailsFormGroup = FormGroup<EsiDetailsFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class EsiDetailsFormService {
  createEsiDetailsFormGroup(esiDetails: EsiDetailsFormGroupInput = { id: null }): EsiDetailsFormGroup {
    const esiDetailsRawValue = this.convertEsiDetailsToEsiDetailsRawValue({
      ...this.getFormDefaults(),
      ...esiDetails,
    });
    return new FormGroup<EsiDetailsFormGroupContent>({
      id: new FormControl(
        { value: esiDetailsRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      isEsiContribution: new FormControl(esiDetailsRawValue.isEsiContribution),
      esiNumber: new FormControl(esiDetailsRawValue.esiNumber),
      esiRate: new FormControl(esiDetailsRawValue.esiRate),
      additionalEsiRate: new FormControl(esiDetailsRawValue.additionalEsiRate),
      totalEsiRate: new FormControl(esiDetailsRawValue.totalEsiRate),
      employeId: new FormControl(esiDetailsRawValue.employeId),
      reEnumerationId: new FormControl(esiDetailsRawValue.reEnumerationId),
      companyId: new FormControl(esiDetailsRawValue.companyId),
      status: new FormControl(esiDetailsRawValue.status),
      lastModified: new FormControl(esiDetailsRawValue.lastModified),
      lastModifiedBy: new FormControl(esiDetailsRawValue.lastModifiedBy),
    });
  }

  getEsiDetails(form: EsiDetailsFormGroup): IEsiDetails | NewEsiDetails {
    return this.convertEsiDetailsRawValueToEsiDetails(form.getRawValue() as EsiDetailsFormRawValue | NewEsiDetailsFormRawValue);
  }

  resetForm(form: EsiDetailsFormGroup, esiDetails: EsiDetailsFormGroupInput): void {
    const esiDetailsRawValue = this.convertEsiDetailsToEsiDetailsRawValue({ ...this.getFormDefaults(), ...esiDetails });
    form.reset(
      {
        ...esiDetailsRawValue,
        id: { value: esiDetailsRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): EsiDetailsFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      isEsiContribution: false,
      lastModified: currentTime,
    };
  }

  private convertEsiDetailsRawValueToEsiDetails(
    rawEsiDetails: EsiDetailsFormRawValue | NewEsiDetailsFormRawValue
  ): IEsiDetails | NewEsiDetails {
    return {
      ...rawEsiDetails,
      lastModified: dayjs(rawEsiDetails.lastModified, DATE_TIME_FORMAT),
    };
  }

  private convertEsiDetailsToEsiDetailsRawValue(
    esiDetails: IEsiDetails | (Partial<NewEsiDetails> & EsiDetailsFormDefaults)
  ): EsiDetailsFormRawValue | PartialWithRequiredKeyOf<NewEsiDetailsFormRawValue> {
    return {
      ...esiDetails,
      lastModified: esiDetails.lastModified ? esiDetails.lastModified.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
