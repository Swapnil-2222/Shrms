import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IRemuneration, NewRemuneration } from '../remuneration.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IRemuneration for edit and NewRemunerationFormGroupInput for create.
 */
type RemunerationFormGroupInput = IRemuneration | PartialWithRequiredKeyOf<NewRemuneration>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends IRemuneration | NewRemuneration> = Omit<T, 'lastModified'> & {
  lastModified?: string | null;
};

type RemunerationFormRawValue = FormValueOf<IRemuneration>;

type NewRemunerationFormRawValue = FormValueOf<NewRemuneration>;

type RemunerationFormDefaults = Pick<NewRemuneration, 'id' | 'lastModified'>;

type RemunerationFormGroupContent = {
  id: FormControl<RemunerationFormRawValue['id'] | NewRemuneration['id']>;
  salaryType: FormControl<RemunerationFormRawValue['salaryType']>;
  amount: FormControl<RemunerationFormRawValue['amount']>;
  paymentType: FormControl<RemunerationFormRawValue['paymentType']>;
  employeId: FormControl<RemunerationFormRawValue['employeId']>;
  companyId: FormControl<RemunerationFormRawValue['companyId']>;
  status: FormControl<RemunerationFormRawValue['status']>;
  lastModified: FormControl<RemunerationFormRawValue['lastModified']>;
  lastModifiedBy: FormControl<RemunerationFormRawValue['lastModifiedBy']>;
};

export type RemunerationFormGroup = FormGroup<RemunerationFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class RemunerationFormService {
  createRemunerationFormGroup(remuneration: RemunerationFormGroupInput = { id: null }): RemunerationFormGroup {
    const remunerationRawValue = this.convertRemunerationToRemunerationRawValue({
      ...this.getFormDefaults(),
      ...remuneration,
    });
    return new FormGroup<RemunerationFormGroupContent>({
      id: new FormControl(
        { value: remunerationRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      salaryType: new FormControl(remunerationRawValue.salaryType),
      amount: new FormControl(remunerationRawValue.amount),
      paymentType: new FormControl(remunerationRawValue.paymentType),
      employeId: new FormControl(remunerationRawValue.employeId),
      companyId: new FormControl(remunerationRawValue.companyId),
      status: new FormControl(remunerationRawValue.status),
      lastModified: new FormControl(remunerationRawValue.lastModified),
      lastModifiedBy: new FormControl(remunerationRawValue.lastModifiedBy),
    });
  }

  getRemuneration(form: RemunerationFormGroup): IRemuneration | NewRemuneration {
    return this.convertRemunerationRawValueToRemuneration(form.getRawValue() as RemunerationFormRawValue | NewRemunerationFormRawValue);
  }

  resetForm(form: RemunerationFormGroup, remuneration: RemunerationFormGroupInput): void {
    const remunerationRawValue = this.convertRemunerationToRemunerationRawValue({ ...this.getFormDefaults(), ...remuneration });
    form.reset(
      {
        ...remunerationRawValue,
        id: { value: remunerationRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): RemunerationFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      lastModified: currentTime,
    };
  }

  private convertRemunerationRawValueToRemuneration(
    rawRemuneration: RemunerationFormRawValue | NewRemunerationFormRawValue
  ): IRemuneration | NewRemuneration {
    return {
      ...rawRemuneration,
      lastModified: dayjs(rawRemuneration.lastModified, DATE_TIME_FORMAT),
    };
  }

  private convertRemunerationToRemunerationRawValue(
    remuneration: IRemuneration | (Partial<NewRemuneration> & RemunerationFormDefaults)
  ): RemunerationFormRawValue | PartialWithRequiredKeyOf<NewRemunerationFormRawValue> {
    return {
      ...remuneration,
      lastModified: remuneration.lastModified ? remuneration.lastModified.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
