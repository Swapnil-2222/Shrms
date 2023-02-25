import dayjs from 'dayjs/esm';

import { IDepartment, NewDepartment } from './department.model';

export const sampleWithRequiredData: IDepartment = {
  id: 39095,
};

export const sampleWithPartialData: IDepartment = {
  id: 8019,
  name: 'Cheese encryption Tuna',
  status: 'Falls Morocco',
  lastModified: dayjs('2023-02-25T02:23'),
};

export const sampleWithFullData: IDepartment = {
  id: 97334,
  name: 'portal Dollar green',
  companyId: 87592,
  status: 'Regional Avon',
  lastModified: dayjs('2023-02-24T10:27'),
  lastModifiedBy: 'Future-proofed Avenue digital',
};

export const sampleWithNewData: NewDepartment = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
