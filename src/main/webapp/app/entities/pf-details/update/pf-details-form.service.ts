import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IPfDetails, NewPfDetails } from '../pf-details.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IPfDetails for edit and NewPfDetailsFormGroupInput for create.
 */
type PfDetailsFormGroupInput = IPfDetails | PartialWithRequiredKeyOf<NewPfDetails>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends IPfDetails | NewPfDetails> = Omit<T, 'lastModified'> & {
  lastModified?: string | null;
};

type PfDetailsFormRawValue = FormValueOf<IPfDetails>;

type NewPfDetailsFormRawValue = FormValueOf<NewPfDetails>;

type PfDetailsFormDefaults = Pick<NewPfDetails, 'id' | 'isPfContribution' | 'lastModified'>;

type PfDetailsFormGroupContent = {
  id: FormControl<PfDetailsFormRawValue['id'] | NewPfDetails['id']>;
  isPfContribution: FormControl<PfDetailsFormRawValue['isPfContribution']>;
  pfNumber: FormControl<PfDetailsFormRawValue['pfNumber']>;
  pfRate: FormControl<PfDetailsFormRawValue['pfRate']>;
  additionalPfRate: FormControl<PfDetailsFormRawValue['additionalPfRate']>;
  totalPfRate: FormControl<PfDetailsFormRawValue['totalPfRate']>;
  employeId: FormControl<PfDetailsFormRawValue['employeId']>;
  reEnumerationId: FormControl<PfDetailsFormRawValue['reEnumerationId']>;
  companyId: FormControl<PfDetailsFormRawValue['companyId']>;
  status: FormControl<PfDetailsFormRawValue['status']>;
  lastModified: FormControl<PfDetailsFormRawValue['lastModified']>;
  lastModifiedBy: FormControl<PfDetailsFormRawValue['lastModifiedBy']>;
};

export type PfDetailsFormGroup = FormGroup<PfDetailsFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class PfDetailsFormService {
  createPfDetailsFormGroup(pfDetails: PfDetailsFormGroupInput = { id: null }): PfDetailsFormGroup {
    const pfDetailsRawValue = this.convertPfDetailsToPfDetailsRawValue({
      ...this.getFormDefaults(),
      ...pfDetails,
    });
    return new FormGroup<PfDetailsFormGroupContent>({
      id: new FormControl(
        { value: pfDetailsRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      isPfContribution: new FormControl(pfDetailsRawValue.isPfContribution),
      pfNumber: new FormControl(pfDetailsRawValue.pfNumber),
      pfRate: new FormControl(pfDetailsRawValue.pfRate),
      additionalPfRate: new FormControl(pfDetailsRawValue.additionalPfRate),
      totalPfRate: new FormControl(pfDetailsRawValue.totalPfRate),
      employeId: new FormControl(pfDetailsRawValue.employeId),
      reEnumerationId: new FormControl(pfDetailsRawValue.reEnumerationId),
      companyId: new FormControl(pfDetailsRawValue.companyId),
      status: new FormControl(pfDetailsRawValue.status),
      lastModified: new FormControl(pfDetailsRawValue.lastModified),
      lastModifiedBy: new FormControl(pfDetailsRawValue.lastModifiedBy),
    });
  }

  getPfDetails(form: PfDetailsFormGroup): IPfDetails | NewPfDetails {
    return this.convertPfDetailsRawValueToPfDetails(form.getRawValue() as PfDetailsFormRawValue | NewPfDetailsFormRawValue);
  }

  resetForm(form: PfDetailsFormGroup, pfDetails: PfDetailsFormGroupInput): void {
    const pfDetailsRawValue = this.convertPfDetailsToPfDetailsRawValue({ ...this.getFormDefaults(), ...pfDetails });
    form.reset(
      {
        ...pfDetailsRawValue,
        id: { value: pfDetailsRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): PfDetailsFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      isPfContribution: false,
      lastModified: currentTime,
    };
  }

  private convertPfDetailsRawValueToPfDetails(rawPfDetails: PfDetailsFormRawValue | NewPfDetailsFormRawValue): IPfDetails | NewPfDetails {
    return {
      ...rawPfDetails,
      lastModified: dayjs(rawPfDetails.lastModified, DATE_TIME_FORMAT),
    };
  }

  private convertPfDetailsToPfDetailsRawValue(
    pfDetails: IPfDetails | (Partial<NewPfDetails> & PfDetailsFormDefaults)
  ): PfDetailsFormRawValue | PartialWithRequiredKeyOf<NewPfDetailsFormRawValue> {
    return {
      ...pfDetails,
      lastModified: pfDetails.lastModified ? pfDetails.lastModified.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
