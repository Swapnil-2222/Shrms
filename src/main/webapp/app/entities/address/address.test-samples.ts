import dayjs from 'dayjs/esm';

import { IAddress, NewAddress } from './address.model';

export const sampleWithRequiredData: IAddress = {
  id: 88754,
};

export const sampleWithPartialData: IAddress = {
  id: 34407,
  type: 'efficient Montana',
  line1: 'interfaces Intelligent Ameliorated',
  state: 'open-source Car hybrid',
  city: 'Kingsport',
  pincode: 'Swiss',
  defaultAdd: true,
  longitude: 33699,
  latitude: 36601,
  companyId: 82451,
  status: 'Account',
  lastModified: dayjs('2023-02-24T13:33'),
  lastModifiedBy: 'intranet',
};

export const sampleWithFullData: IAddress = {
  id: 17957,
  type: 'Salad dynamic Birr',
  line1: 'Creative bus',
  line2: 'Handmade',
  country: 'Estonia',
  state: 'maximize withdrawal',
  city: 'Kovacekstad',
  pincode: 'haptic Hill',
  defaultAdd: false,
  landMark: 'cross-platform Account value-added',
  longitude: 14972,
  latitude: 31465,
  refTable: 'microchip Territories',
  refTableId: 19987,
  companyId: 67691,
  status: 'SDD',
  lastModified: dayjs('2023-02-24T21:12'),
  lastModifiedBy: 'indigo',
};

export const sampleWithNewData: NewAddress = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
