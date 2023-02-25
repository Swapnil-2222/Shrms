import dayjs from 'dayjs/esm';

import { IPersonalId, NewPersonalId } from './personal-id.model';

export const sampleWithRequiredData: IPersonalId = {
  id: 87944,
};

export const sampleWithPartialData: IPersonalId = {
  id: 62066,
  number: 'invoice',
  issueDate: dayjs('2023-02-24T08:15'),
  expDate: dayjs('2023-02-24T20:28'),
  issuingAuthority: 'Fresh e-services',
  docUrl: 'Markets sensor',
  employeeId: 61246,
  companyId: 50545,
  status: 'transitional Frozen aggregate',
  lastModifiedBy: 'Research transparent',
};

export const sampleWithFullData: IPersonalId = {
  id: 13860,
  type: 'Books Personal e-business',
  number: 'Architect withdrawal',
  issueDate: dayjs('2023-02-24T14:52'),
  expDate: dayjs('2023-02-24T10:49'),
  issuingAuthority: 'calculate transmitting e-tailers',
  docUrl: 'Plastic',
  employeeId: 74498,
  companyId: 81029,
  status: 'Granite Gloves',
  lastModified: dayjs('2023-02-24T14:10'),
  lastModifiedBy: 'Technician holistic',
};

export const sampleWithNewData: NewPersonalId = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
