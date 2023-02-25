import dayjs from 'dayjs/esm';

import { IRemuneration, NewRemuneration } from './remuneration.model';

export const sampleWithRequiredData: IRemuneration = {
  id: 47544,
};

export const sampleWithPartialData: IRemuneration = {
  id: 71154,
  amount: 7845,
  companyId: 54128,
  lastModified: dayjs('2023-02-25T01:20'),
};

export const sampleWithFullData: IRemuneration = {
  id: 95147,
  salaryType: 'Pants Strategist',
  amount: 71983,
  paymentType: 'Crossroad Bedfordshire Berkshire',
  employeId: 3333,
  companyId: 38424,
  status: 'Technician array',
  lastModified: dayjs('2023-02-24T09:03'),
  lastModifiedBy: 'static withdrawal Rubber',
};

export const sampleWithNewData: NewRemuneration = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
