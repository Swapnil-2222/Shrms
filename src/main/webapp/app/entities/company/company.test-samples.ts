import dayjs from 'dayjs/esm';

import { ICompany, NewCompany } from './company.model';

export const sampleWithRequiredData: ICompany = {
  id: 32440,
};

export const sampleWithPartialData: ICompany = {
  id: 9312,
  contactPerson: 'Avon Granite visualize',
  email: 'Assunta.Emmerich@yahoo.com',
  phoneNumber: 'contextually-based Ball',
  mobileNumber: 'contingency',
  fax: 'Ford Botswana 1080p',
  status: 'RAM withdrawal',
};

export const sampleWithFullData: ICompany = {
  id: 69391,
  companyName: 'Dynamic navigate Cambridgeshire',
  contactPerson: 'JSON Coordinator',
  postalCode: 'neural Account',
  email: 'Hollis.Purdy35@hotmail.com',
  phoneNumber: 'target',
  mobileNumber: 'Squares',
  websiteUrl: 'optimizing deliver',
  fax: '1080p',
  regNumber: 'generating Avon National',
  status: 'wireless Frozen Home',
  lastModified: dayjs('2023-02-24T19:33'),
  lastModifiedBy: 'Central',
};

export const sampleWithNewData: NewCompany = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
