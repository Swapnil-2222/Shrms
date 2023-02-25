import dayjs from 'dayjs/esm';

import { IEmployee, NewEmployee } from './employee.model';

export const sampleWithRequiredData: IEmployee = {
  id: 7813,
  empUniqueId: 'transmitting',
};

export const sampleWithPartialData: IEmployee = {
  id: 40560,
  firstName: 'Eddie',
  lastName: 'Stoltenberg',
  department: 'zero Kyrgyz',
  designation: 'grey SSL sensor',
  gender: 'National Analyst Cambridgeshire',
  empUniqueId: 'user-centric invoice',
  companyId: 33981,
  lastModifiedBy: 'Loan challenge Iranian',
  employmentTypeId: 40187,
};

export const sampleWithFullData: IEmployee = {
  id: 12223,
  firstName: 'Kelsi',
  middleName: 'Forward',
  lastName: 'Kerluke',
  department: 'Island Concrete Music',
  designation: 'Sausages Account',
  gender: 'Liaison innovative Tactics',
  empUniqueId: 'US',
  joindate: dayjs('2023-02-25T02:53'),
  companyId: 17628,
  branchId: 60034,
  regionId: 56551,
  status: 'SDR XSS SMTP',
  lastModified: dayjs('2023-02-24T13:55'),
  lastModifiedBy: 'Brand Crossroad',
  employmentTypeId: 90142,
};

export const sampleWithNewData: NewEmployee = {
  empUniqueId: 'Money circuit Manager',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
