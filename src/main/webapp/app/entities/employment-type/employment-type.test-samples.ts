import dayjs from 'dayjs/esm';

import { IEmploymentType, NewEmploymentType } from './employment-type.model';

export const sampleWithRequiredData: IEmploymentType = {
  id: 32490,
};

export const sampleWithPartialData: IEmploymentType = {
  id: 89021,
  name: 'Compatible',
};

export const sampleWithFullData: IEmploymentType = {
  id: 31847,
  name: 'Ergonomic',
  subtype: 'Licensed Suriname',
  companyId: 75127,
  status: 'neural-net',
  lastModified: dayjs('2023-02-24T08:28'),
  lastModifiedBy: 'AGP',
};

export const sampleWithNewData: NewEmploymentType = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
