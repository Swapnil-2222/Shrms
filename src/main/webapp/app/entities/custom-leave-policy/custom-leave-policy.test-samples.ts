import dayjs from 'dayjs/esm';

import { ICustomLeavePolicy, NewCustomLeavePolicy } from './custom-leave-policy.model';

export const sampleWithRequiredData: ICustomLeavePolicy = {
  id: 23554,
};

export const sampleWithPartialData: ICustomLeavePolicy = {
  id: 2885,
  employeeId: 36289,
  companyId: 54104,
  lastModified: dayjs('2023-02-25T05:36'),
  lastModifiedBy: 'user-facing contextually-based Islands,',
};

export const sampleWithFullData: ICustomLeavePolicy = {
  id: 84361,
  leavePolicyId: 56981,
  employeeId: 20758,
  days: 55286,
  companyId: 83212,
  status: 'Global mesh maximized',
  lastModified: dayjs('2023-02-25T03:40'),
  lastModifiedBy: 'Intuitive Cambridgeshire optimize',
};

export const sampleWithNewData: NewCustomLeavePolicy = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
