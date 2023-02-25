import dayjs from 'dayjs/esm';

import { IState, NewState } from './state.model';

export const sampleWithRequiredData: IState = {
  id: 97627,
  stateName: 'Games microchip',
};

export const sampleWithPartialData: IState = {
  id: 35175,
  stateName: 'Cambodia synergies Architect',
  lgdCode: 26068,
  lastModifiedBy: 'compressing Mill',
};

export const sampleWithFullData: IState = {
  id: 35522,
  stateName: 'Plastic',
  lgdCode: 2827,
  status: 'Usability olive Cambridgeshire',
  lastModified: dayjs('2023-02-25T03:25'),
  lastModifiedBy: 'Light Small',
};

export const sampleWithNewData: NewState = {
  stateName: 'Supervisor Buckinghamshire',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
