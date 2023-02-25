import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IHoliday, NewHoliday } from '../holiday.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IHoliday for edit and NewHolidayFormGroupInput for create.
 */
type HolidayFormGroupInput = IHoliday | PartialWithRequiredKeyOf<NewHoliday>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends IHoliday | NewHoliday> = Omit<T, 'holidayDate' | 'year' | 'lastModified'> & {
  holidayDate?: string | null;
  year?: string | null;
  lastModified?: string | null;
};

type HolidayFormRawValue = FormValueOf<IHoliday>;

type NewHolidayFormRawValue = FormValueOf<NewHoliday>;

type HolidayFormDefaults = Pick<NewHoliday, 'id' | 'holidayDate' | 'year' | 'lastModified'>;

type HolidayFormGroupContent = {
  id: FormControl<HolidayFormRawValue['id'] | NewHoliday['id']>;
  holidayName: FormControl<HolidayFormRawValue['holidayName']>;
  holidayDate: FormControl<HolidayFormRawValue['holidayDate']>;
  day: FormControl<HolidayFormRawValue['day']>;
  year: FormControl<HolidayFormRawValue['year']>;
  companyId: FormControl<HolidayFormRawValue['companyId']>;
  status: FormControl<HolidayFormRawValue['status']>;
  lastModified: FormControl<HolidayFormRawValue['lastModified']>;
  lastModifiedBy: FormControl<HolidayFormRawValue['lastModifiedBy']>;
};

export type HolidayFormGroup = FormGroup<HolidayFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class HolidayFormService {
  createHolidayFormGroup(holiday: HolidayFormGroupInput = { id: null }): HolidayFormGroup {
    const holidayRawValue = this.convertHolidayToHolidayRawValue({
      ...this.getFormDefaults(),
      ...holiday,
    });
    return new FormGroup<HolidayFormGroupContent>({
      id: new FormControl(
        { value: holidayRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      holidayName: new FormControl(holidayRawValue.holidayName),
      holidayDate: new FormControl(holidayRawValue.holidayDate),
      day: new FormControl(holidayRawValue.day),
      year: new FormControl(holidayRawValue.year),
      companyId: new FormControl(holidayRawValue.companyId),
      status: new FormControl(holidayRawValue.status),
      lastModified: new FormControl(holidayRawValue.lastModified),
      lastModifiedBy: new FormControl(holidayRawValue.lastModifiedBy),
    });
  }

  getHoliday(form: HolidayFormGroup): IHoliday | NewHoliday {
    return this.convertHolidayRawValueToHoliday(form.getRawValue() as HolidayFormRawValue | NewHolidayFormRawValue);
  }

  resetForm(form: HolidayFormGroup, holiday: HolidayFormGroupInput): void {
    const holidayRawValue = this.convertHolidayToHolidayRawValue({ ...this.getFormDefaults(), ...holiday });
    form.reset(
      {
        ...holidayRawValue,
        id: { value: holidayRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): HolidayFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      holidayDate: currentTime,
      year: currentTime,
      lastModified: currentTime,
    };
  }

  private convertHolidayRawValueToHoliday(rawHoliday: HolidayFormRawValue | NewHolidayFormRawValue): IHoliday | NewHoliday {
    return {
      ...rawHoliday,
      holidayDate: dayjs(rawHoliday.holidayDate, DATE_TIME_FORMAT),
      year: dayjs(rawHoliday.year, DATE_TIME_FORMAT),
      lastModified: dayjs(rawHoliday.lastModified, DATE_TIME_FORMAT),
    };
  }

  private convertHolidayToHolidayRawValue(
    holiday: IHoliday | (Partial<NewHoliday> & HolidayFormDefaults)
  ): HolidayFormRawValue | PartialWithRequiredKeyOf<NewHolidayFormRawValue> {
    return {
      ...holiday,
      holidayDate: holiday.holidayDate ? holiday.holidayDate.format(DATE_TIME_FORMAT) : undefined,
      year: holiday.year ? holiday.year.format(DATE_TIME_FORMAT) : undefined,
      lastModified: holiday.lastModified ? holiday.lastModified.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
