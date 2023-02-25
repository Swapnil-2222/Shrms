import dayjs from 'dayjs/esm';

import { IHoliday, NewHoliday } from './holiday.model';

export const sampleWithRequiredData: IHoliday = {
  id: 1031,
};

export const sampleWithPartialData: IHoliday = {
  id: 27584,
  holidayName: 'neural-net',
  day: 'pixel quantifying',
  companyId: 3953,
  lastModified: dayjs('2023-02-24T10:42'),
  lastModifiedBy: 'quantify',
};

export const sampleWithFullData: IHoliday = {
  id: 20090,
  holidayName: 'Bedfordshire',
  holidayDate: dayjs('2023-02-24T13:56'),
  day: 'web-enabled',
  year: dayjs('2023-02-25T06:05'),
  companyId: 93657,
  status: 'parse',
  lastModified: dayjs('2023-02-24T12:46'),
  lastModifiedBy: 'multi-byte',
};

export const sampleWithNewData: NewHoliday = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
