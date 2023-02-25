import dayjs from 'dayjs/esm';

import { ILeaveApplication, NewLeaveApplication } from './leave-application.model';

export const sampleWithRequiredData: ILeaveApplication = {
  id: 91940,
};

export const sampleWithPartialData: ILeaveApplication = {
  id: 48531,
  noOfDays: 95755,
  reason: 'Shoes',
  toDate: dayjs('2023-02-24T14:06'),
  leaveStatus: 'Handcrafted Bangladesh',
  employeId: 10111,
  companyId: 26343,
  lastModified: dayjs('2023-02-24T23:28'),
  lastModifiedBy: 'Maldives',
};

export const sampleWithFullData: ILeaveApplication = {
  id: 18336,
  leaveType: 'Home Advanced',
  balanceLeave: 87139,
  noOfDays: 43755,
  reason: 'Computers',
  year: 85532,
  formDate: dayjs('2023-02-25T03:53'),
  toDate: dayjs('2023-02-24T12:38'),
  leaveStatus: 'drive',
  status: 'Books',
  employeId: 16704,
  companyId: 37074,
  lastModified: dayjs('2023-02-24T10:52'),
  lastModifiedBy: 'innovative embrace GB',
};

export const sampleWithNewData: NewLeaveApplication = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
