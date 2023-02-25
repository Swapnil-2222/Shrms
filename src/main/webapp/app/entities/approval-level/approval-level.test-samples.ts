import dayjs from 'dayjs/esm';

import { IApprovalLevel, NewApprovalLevel } from './approval-level.model';

export const sampleWithRequiredData: IApprovalLevel = {
  id: 3431,
};

export const sampleWithPartialData: IApprovalLevel = {
  id: 37664,
  name: 'Incredible Auto',
  squence: 96244,
  approvalSettingId: 99541,
  status: 'eyeballs',
  lastModifiedBy: 'capacity',
};

export const sampleWithFullData: IApprovalLevel = {
  id: 83969,
  name: 'Personal Handcrafted Well',
  squence: 3858,
  approvalSettingId: 69495,
  companyId: 24773,
  status: 'Clothing Concrete',
  lastModified: dayjs('2023-02-24T16:58'),
  lastModifiedBy: 'foreground Chicken',
};

export const sampleWithNewData: NewApprovalLevel = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
