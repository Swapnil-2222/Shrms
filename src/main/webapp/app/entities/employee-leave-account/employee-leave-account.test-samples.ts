import dayjs from 'dayjs/esm';

import { IEmployeeLeaveAccount, NewEmployeeLeaveAccount } from './employee-leave-account.model';

export const sampleWithRequiredData: IEmployeeLeaveAccount = {
  id: 61021,
};

export const sampleWithPartialData: IEmployeeLeaveAccount = {
  id: 92811,
  employeeId: 79472,
  carriedLeaves: 'improvement Money Riel',
  creditedLeaves: 'SCSI haptic',
  companyId: 14241,
};

export const sampleWithFullData: IEmployeeLeaveAccount = {
  id: 36158,
  leaveTypeId: 76163,
  employeeId: 15902,
  carriedLeaves: 'gold',
  creditedLeaves: 'transmitting',
  date: dayjs('2023-02-25T05:15'),
  balance: 'clicks-and-mortar blue',
  companyId: 30396,
  status: 'parsing Fish',
  lastModified: dayjs('2023-02-24T20:44'),
  lastModifiedBy: 'SMTP',
};

export const sampleWithNewData: NewEmployeeLeaveAccount = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
