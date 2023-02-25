import dayjs from 'dayjs/esm';

import { ISalarySettings, NewSalarySettings } from './salary-settings.model';

export const sampleWithRequiredData: ISalarySettings = {
  id: 18645,
};

export const sampleWithPartialData: ISalarySettings = {
  id: 67060,
  da: 72492,
  companyId: 82287,
  lastModified: dayjs('2023-02-25T03:52'),
};

export const sampleWithFullData: ISalarySettings = {
  id: 90199,
  da: 96040,
  hra: 57965,
  employeeShare: 60468,
  companyShare: 83635,
  companyId: 75557,
  status: 'Books JBOD wireless',
  lastModified: dayjs('2023-02-24T09:39'),
  lastModifiedBy: 'efficient',
};

export const sampleWithNewData: NewSalarySettings = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
