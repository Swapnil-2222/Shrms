import dayjs from 'dayjs/esm';

import { IWorkingHours, NewWorkingHours } from './working-hours.model';

export const sampleWithRequiredData: IWorkingHours = {
  id: 65185,
};

export const sampleWithPartialData: IWorkingHours = {
  id: 64898,
  noOfHours: 'Grenada blockchains',
  employmentTypeId: 90654,
  status: 'Concrete',
};

export const sampleWithFullData: IWorkingHours = {
  id: 5341,
  noOfHours: 'ivory',
  employmentTypeId: 16275,
  companyId: 86639,
  status: 'alliance',
  lastModified: dayjs('2023-02-25T07:40'),
  lastModifiedBy: 'Bedfordshire New',
};

export const sampleWithNewData: NewWorkingHours = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
