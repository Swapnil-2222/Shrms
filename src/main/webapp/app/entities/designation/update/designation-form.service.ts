import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IDesignation, NewDesignation } from '../designation.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IDesignation for edit and NewDesignationFormGroupInput for create.
 */
type DesignationFormGroupInput = IDesignation | PartialWithRequiredKeyOf<NewDesignation>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends IDesignation | NewDesignation> = Omit<T, 'lastModified'> & {
  lastModified?: string | null;
};

type DesignationFormRawValue = FormValueOf<IDesignation>;

type NewDesignationFormRawValue = FormValueOf<NewDesignation>;

type DesignationFormDefaults = Pick<NewDesignation, 'id' | 'lastModified'>;

type DesignationFormGroupContent = {
  id: FormControl<DesignationFormRawValue['id'] | NewDesignation['id']>;
  name: FormControl<DesignationFormRawValue['name']>;
  departmentId: FormControl<DesignationFormRawValue['departmentId']>;
  companyId: FormControl<DesignationFormRawValue['companyId']>;
  status: FormControl<DesignationFormRawValue['status']>;
  lastModified: FormControl<DesignationFormRawValue['lastModified']>;
  lastModifiedBy: FormControl<DesignationFormRawValue['lastModifiedBy']>;
};

export type DesignationFormGroup = FormGroup<DesignationFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class DesignationFormService {
  createDesignationFormGroup(designation: DesignationFormGroupInput = { id: null }): DesignationFormGroup {
    const designationRawValue = this.convertDesignationToDesignationRawValue({
      ...this.getFormDefaults(),
      ...designation,
    });
    return new FormGroup<DesignationFormGroupContent>({
      id: new FormControl(
        { value: designationRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      name: new FormControl(designationRawValue.name),
      departmentId: new FormControl(designationRawValue.departmentId),
      companyId: new FormControl(designationRawValue.companyId),
      status: new FormControl(designationRawValue.status),
      lastModified: new FormControl(designationRawValue.lastModified),
      lastModifiedBy: new FormControl(designationRawValue.lastModifiedBy),
    });
  }

  getDesignation(form: DesignationFormGroup): IDesignation | NewDesignation {
    return this.convertDesignationRawValueToDesignation(form.getRawValue() as DesignationFormRawValue | NewDesignationFormRawValue);
  }

  resetForm(form: DesignationFormGroup, designation: DesignationFormGroupInput): void {
    const designationRawValue = this.convertDesignationToDesignationRawValue({ ...this.getFormDefaults(), ...designation });
    form.reset(
      {
        ...designationRawValue,
        id: { value: designationRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): DesignationFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      lastModified: currentTime,
    };
  }

  private convertDesignationRawValueToDesignation(
    rawDesignation: DesignationFormRawValue | NewDesignationFormRawValue
  ): IDesignation | NewDesignation {
    return {
      ...rawDesignation,
      lastModified: dayjs(rawDesignation.lastModified, DATE_TIME_FORMAT),
    };
  }

  private convertDesignationToDesignationRawValue(
    designation: IDesignation | (Partial<NewDesignation> & DesignationFormDefaults)
  ): DesignationFormRawValue | PartialWithRequiredKeyOf<NewDesignationFormRawValue> {
    return {
      ...designation,
      lastModified: designation.lastModified ? designation.lastModified.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
