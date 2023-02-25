import dayjs from 'dayjs/esm';

import { ITds, NewTds } from './tds.model';

export const sampleWithRequiredData: ITds = {
  id: 68530,
};

export const sampleWithPartialData: ITds = {
  id: 88582,
  salaryFrom: dayjs('2023-02-25T07:46'),
  percentage: 80386,
  companyId: 75319,
  status: 'Maryland teal Cambridgeshire',
  lastModified: dayjs('2023-02-24T13:38'),
};

export const sampleWithFullData: ITds = {
  id: 69884,
  salaryFrom: dayjs('2023-02-24T21:13'),
  salaryTo: dayjs('2023-02-24T21:14'),
  percentage: 4811,
  salarySettingId: 59364,
  companyId: 848,
  status: 'communities',
  lastModified: dayjs('2023-02-25T07:44'),
  lastModifiedBy: 'Account',
};

export const sampleWithNewData: NewTds = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
