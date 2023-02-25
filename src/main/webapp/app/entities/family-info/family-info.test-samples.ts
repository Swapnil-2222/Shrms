import dayjs from 'dayjs/esm';

import { IFamilyInfo, NewFamilyInfo } from './family-info.model';

export const sampleWithRequiredData: IFamilyInfo = {
  id: 35605,
};

export const sampleWithPartialData: IFamilyInfo = {
  id: 22997,
  employeeId: 62934,
  companyId: 32196,
  status: '24/365 AGP bypass',
  lastModifiedBy: 'uniform monetize mesh',
};

export const sampleWithFullData: IFamilyInfo = {
  id: 52580,
  name: 'IB',
  dateOfBirth: dayjs('2023-02-24'),
  relation: 'Bahrain',
  addressId: 77628,
  isEmployed: true,
  employedAt: 'Toys Metal Gloves',
  employeeId: 12802,
  companyId: 69719,
  status: 'SDD transmit Intranet',
  lastModified: dayjs('2023-02-25T02:44'),
  lastModifiedBy: 'Mali PNG virtual',
};

export const sampleWithNewData: NewFamilyInfo = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
