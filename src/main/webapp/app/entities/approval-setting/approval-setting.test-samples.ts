import dayjs from 'dayjs/esm';

import { IApprovalSetting, NewApprovalSetting } from './approval-setting.model';

export const sampleWithRequiredData: IApprovalSetting = {
  id: 49229,
};

export const sampleWithPartialData: IApprovalSetting = {
  id: 93262,
  lastModified: dayjs('2023-02-24T21:51'),
  lastModifiedBy: 'Small eyeballs',
};

export const sampleWithFullData: IApprovalSetting = {
  id: 79824,
  type: 'Account Unbranded Kentucky',
  approvalCategory: 54209,
  companyId: 2902,
  status: 'payment Human',
  lastModified: dayjs('2023-02-24T19:40'),
  lastModifiedBy: 'Dynamic',
};

export const sampleWithNewData: NewApprovalSetting = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
