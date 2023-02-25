import dayjs from 'dayjs/esm';

import { ILeaveType, NewLeaveType } from './leave-type.model';

export const sampleWithRequiredData: ILeaveType = {
  id: 21210,
};

export const sampleWithPartialData: ILeaveType = {
  id: 3615,
  noOfDays: 'Assistant applications Borders',
  status: 'Administrator',
  lastModifiedBy: 'Compatible Movies',
  hasEarned: false,
  hasCustomPolicy: true,
};

export const sampleWithFullData: ILeaveType = {
  id: 193,
  leaveType: 'Manager invoice Buckinghamshire',
  noOfDays: 'copy PNG Movies',
  companyId: 51415,
  status: 'Market',
  lastModified: dayjs('2023-02-24T21:03'),
  lastModifiedBy: 'deposit',
  hasCarryForward: true,
  hasEarned: true,
  hasCustomPolicy: false,
};

export const sampleWithNewData: NewLeaveType = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
