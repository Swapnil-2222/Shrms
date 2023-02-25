import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IEducation, NewEducation } from '../education.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IEducation for edit and NewEducationFormGroupInput for create.
 */
type EducationFormGroupInput = IEducation | PartialWithRequiredKeyOf<NewEducation>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends IEducation | NewEducation> = Omit<T, 'startYear' | 'endDate' | 'lastModified'> & {
  startYear?: string | null;
  endDate?: string | null;
  lastModified?: string | null;
};

type EducationFormRawValue = FormValueOf<IEducation>;

type NewEducationFormRawValue = FormValueOf<NewEducation>;

type EducationFormDefaults = Pick<NewEducation, 'id' | 'startYear' | 'endDate' | 'lastModified'>;

type EducationFormGroupContent = {
  id: FormControl<EducationFormRawValue['id'] | NewEducation['id']>;
  institution: FormControl<EducationFormRawValue['institution']>;
  subject: FormControl<EducationFormRawValue['subject']>;
  startYear: FormControl<EducationFormRawValue['startYear']>;
  endDate: FormControl<EducationFormRawValue['endDate']>;
  educationType: FormControl<EducationFormRawValue['educationType']>;
  grade: FormControl<EducationFormRawValue['grade']>;
  description: FormControl<EducationFormRawValue['description']>;
  employeeId: FormControl<EducationFormRawValue['employeeId']>;
  companyId: FormControl<EducationFormRawValue['companyId']>;
  status: FormControl<EducationFormRawValue['status']>;
  lastModified: FormControl<EducationFormRawValue['lastModified']>;
  lastModifiedBy: FormControl<EducationFormRawValue['lastModifiedBy']>;
};

export type EducationFormGroup = FormGroup<EducationFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class EducationFormService {
  createEducationFormGroup(education: EducationFormGroupInput = { id: null }): EducationFormGroup {
    const educationRawValue = this.convertEducationToEducationRawValue({
      ...this.getFormDefaults(),
      ...education,
    });
    return new FormGroup<EducationFormGroupContent>({
      id: new FormControl(
        { value: educationRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      institution: new FormControl(educationRawValue.institution),
      subject: new FormControl(educationRawValue.subject),
      startYear: new FormControl(educationRawValue.startYear),
      endDate: new FormControl(educationRawValue.endDate),
      educationType: new FormControl(educationRawValue.educationType),
      grade: new FormControl(educationRawValue.grade),
      description: new FormControl(educationRawValue.description),
      employeeId: new FormControl(educationRawValue.employeeId),
      companyId: new FormControl(educationRawValue.companyId),
      status: new FormControl(educationRawValue.status),
      lastModified: new FormControl(educationRawValue.lastModified),
      lastModifiedBy: new FormControl(educationRawValue.lastModifiedBy),
    });
  }

  getEducation(form: EducationFormGroup): IEducation | NewEducation {
    return this.convertEducationRawValueToEducation(form.getRawValue() as EducationFormRawValue | NewEducationFormRawValue);
  }

  resetForm(form: EducationFormGroup, education: EducationFormGroupInput): void {
    const educationRawValue = this.convertEducationToEducationRawValue({ ...this.getFormDefaults(), ...education });
    form.reset(
      {
        ...educationRawValue,
        id: { value: educationRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): EducationFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      startYear: currentTime,
      endDate: currentTime,
      lastModified: currentTime,
    };
  }

  private convertEducationRawValueToEducation(rawEducation: EducationFormRawValue | NewEducationFormRawValue): IEducation | NewEducation {
    return {
      ...rawEducation,
      startYear: dayjs(rawEducation.startYear, DATE_TIME_FORMAT),
      endDate: dayjs(rawEducation.endDate, DATE_TIME_FORMAT),
      lastModified: dayjs(rawEducation.lastModified, DATE_TIME_FORMAT),
    };
  }

  private convertEducationToEducationRawValue(
    education: IEducation | (Partial<NewEducation> & EducationFormDefaults)
  ): EducationFormRawValue | PartialWithRequiredKeyOf<NewEducationFormRawValue> {
    return {
      ...education,
      startYear: education.startYear ? education.startYear.format(DATE_TIME_FORMAT) : undefined,
      endDate: education.endDate ? education.endDate.format(DATE_TIME_FORMAT) : undefined,
      lastModified: education.lastModified ? education.lastModified.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
