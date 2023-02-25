import dayjs from 'dayjs/esm';

import { IBanksDetails, NewBanksDetails } from './banks-details.model';

export const sampleWithRequiredData: IBanksDetails = {
  id: 92491,
};

export const sampleWithPartialData: IBanksDetails = {
  id: 23757,
  bankName: 'Bedfordshire',
  branchTransCode: 'strategy',
  taxNumber: 'purple',
  gstin: 'magenta wireless Minnesota',
  tan: 'lavender bandwidth Tuna',
  refTableId: 6242,
  lastModified: dayjs('2023-02-24T09:48'),
  lastModifiedBy: 'lime Account Mountains',
};

export const sampleWithFullData: IBanksDetails = {
  id: 18113,
  accountNumber: 88198,
  bankName: 'orchid Towels Account',
  branchTransCode: 'synergies indexing',
  taxNumber: 'USB channels',
  gstin: 'Brand Carolina',
  tan: 'Parkway index',
  branchName: 'Optimization',
  refTable: 'Borders panel',
  refTableId: 73424,
  companyId: 18480,
  status: 'bus',
  lastModified: dayjs('2023-02-24T14:31'),
  lastModifiedBy: 'Concrete web-enabled Shirt',
};

export const sampleWithNewData: NewBanksDetails = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
