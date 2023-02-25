import dayjs from 'dayjs/esm';

import { ILeavePolicy, NewLeavePolicy } from './leave-policy.model';

export const sampleWithRequiredData: ILeavePolicy = {
  id: 78331,
};

export const sampleWithPartialData: ILeavePolicy = {
  id: 1109,
  maxLeave: 'Berkshire',
  hasproRataLeave: false,
  description: 'Ball Alabama payment',
  status: 'Forges',
  lastModified: dayjs('2023-02-24T10:18'),
};

export const sampleWithFullData: ILeavePolicy = {
  id: 87902,
  leaveType: 'Granite Buckinghamshire',
  isCarryForword: false,
  employeeType: 'Optimized Awesome Awesome',
  genderLeave: 'Naira Borders',
  totalLeave: 'relationships indigo',
  maxLeave: 'Arizona',
  hasproRataLeave: true,
  description: 'Research',
  companyId: 24624,
  status: 'groupware',
  lastModified: dayjs('2023-02-24T12:41'),
  lastModifiedBy: 'optimize',
};

export const sampleWithNewData: NewLeavePolicy = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
