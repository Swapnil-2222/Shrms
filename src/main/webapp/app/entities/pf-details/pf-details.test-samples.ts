import dayjs from 'dayjs/esm';

import { IPfDetails, NewPfDetails } from './pf-details.model';

export const sampleWithRequiredData: IPfDetails = {
  id: 67438,
};

export const sampleWithPartialData: IPfDetails = {
  id: 47207,
  pfNumber: 'schemas fuchsia transmitter',
  totalPfRate: 53351,
  reEnumerationId: 24780,
  companyId: 66525,
  status: 'Books moratorium indigo',
  lastModified: dayjs('2023-02-24T22:03'),
  lastModifiedBy: 'Plastic generate',
};

export const sampleWithFullData: IPfDetails = {
  id: 92088,
  isPfContribution: true,
  pfNumber: 'Supervisor XML',
  pfRate: 25994,
  additionalPfRate: 'Strategist deposit e-services',
  totalPfRate: 11023,
  employeId: 95537,
  reEnumerationId: 96024,
  companyId: 40787,
  status: 'interactive bluetooth Enhanced',
  lastModified: dayjs('2023-02-24T16:07'),
  lastModifiedBy: 'transmit Krone',
};

export const sampleWithNewData: NewPfDetails = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
