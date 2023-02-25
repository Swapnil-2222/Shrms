import dayjs from 'dayjs/esm';

import { IContacts, NewContacts } from './contacts.model';

export const sampleWithRequiredData: IContacts = {
  id: 22084,
};

export const sampleWithPartialData: IContacts = {
  id: 55483,
  contactPref: 'virtual Dynamic Saudi',
  contactType: 'Account Balboa Buckinghamshire',
  refTableId: 21187,
  companyId: 36371,
  lastModified: dayjs('2023-02-24T10:50'),
};

export const sampleWithFullData: IContacts = {
  id: 35170,
  name: 'Direct invoice',
  contactPref: 'matrices Strategist Neck',
  contactType: 'Personal',
  contact: 'Computer Ergonomic Dynamic',
  refTable: 'Cotton',
  refTableId: 32161,
  companyId: 15641,
  status: 'multi-byte Program Account',
  lastModified: dayjs('2023-02-24T11:51'),
  lastModifiedBy: 'Balanced AGP Bike',
  contactReference: 'Pizza Health',
};

export const sampleWithNewData: NewContacts = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
