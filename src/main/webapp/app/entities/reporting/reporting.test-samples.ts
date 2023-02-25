import dayjs from 'dayjs/esm';

import { IReporting, NewReporting } from './reporting.model';

export const sampleWithRequiredData: IReporting = {
  id: 67489,
};

export const sampleWithPartialData: IReporting = {
  id: 42179,
  reportingId: 11036,
  status: 'Licensed encoding',
  lastModifiedBy: 'wireless Pants application',
};

export const sampleWithFullData: IReporting = {
  id: 68484,
  employeeId: 33537,
  reportingEmpId: 71804,
  reportingId: 96006,
  companyId: 42357,
  status: 'synergy',
  lastModified: dayjs('2023-02-24T16:11'),
  lastModifiedBy: 'Lodge solution',
};

export const sampleWithNewData: NewReporting = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
