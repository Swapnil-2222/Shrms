import dayjs from 'dayjs/esm';

import { IWorkDaysSetting, NewWorkDaysSetting } from './work-days-setting.model';

export const sampleWithRequiredData: IWorkDaysSetting = {
  id: 81137,
};

export const sampleWithPartialData: IWorkDaysSetting = {
  id: 13698,
  day: 'Usability',
  hours: 'upward-trending target',
  lastModified: dayjs('2023-02-24T22:27'),
  lastModifiedBy: 'Unbranded Cambridgeshire',
};

export const sampleWithFullData: IWorkDaysSetting = {
  id: 68602,
  day: 'transform Liaison copy',
  hours: 'Australia Steel Account',
  dayOff: false,
  companyId: 34394,
  status: 'withdrawal product Mobility',
  lastModified: dayjs('2023-02-25T02:27'),
  lastModifiedBy: 'driver Solutions',
};

export const sampleWithNewData: NewWorkDaysSetting = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
