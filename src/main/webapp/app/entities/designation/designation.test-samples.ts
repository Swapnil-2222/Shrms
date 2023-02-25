import dayjs from 'dayjs/esm';

import { IDesignation, NewDesignation } from './designation.model';

export const sampleWithRequiredData: IDesignation = {
  id: 18278,
};

export const sampleWithPartialData: IDesignation = {
  id: 20362,
  name: 'contingency Officer',
  companyId: 43628,
  lastModified: dayjs('2023-02-25T01:38'),
};

export const sampleWithFullData: IDesignation = {
  id: 24468,
  name: 'Infrastructure Ball',
  departmentId: 39910,
  companyId: 22646,
  status: 'THX',
  lastModified: dayjs('2023-02-24T19:51'),
  lastModifiedBy: 'generate connect',
};

export const sampleWithNewData: NewDesignation = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
