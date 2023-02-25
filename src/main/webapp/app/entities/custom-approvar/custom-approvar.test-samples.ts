import dayjs from 'dayjs/esm';

import { ICustomApprovar, NewCustomApprovar } from './custom-approvar.model';

export const sampleWithRequiredData: ICustomApprovar = {
  id: 15720,
};

export const sampleWithPartialData: ICustomApprovar = {
  id: 22535,
  approvalSettingId: 'Awesome port',
  status: 'Rubber Guyana green',
};

export const sampleWithFullData: ICustomApprovar = {
  id: 71495,
  employeId: 88534,
  approvalSettingId: 'real-time',
  squence: 'hacking',
  companyId: 84048,
  status: 'XML online Human',
  lastModified: dayjs('2023-02-25T04:33'),
  lastModifiedBy: 'Neck cyan engage',
};

export const sampleWithNewData: NewCustomApprovar = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
