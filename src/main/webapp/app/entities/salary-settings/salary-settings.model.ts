import dayjs from 'dayjs/esm';

export interface ISalarySettings {
  id: number;
  da?: number | null;
  hra?: number | null;
  employeeShare?: number | null;
  companyShare?: number | null;
  companyId?: number | null;
  status?: string | null;
  lastModified?: dayjs.Dayjs | null;
  lastModifiedBy?: string | null;
}

export type NewSalarySettings = Omit<ISalarySettings, 'id'> & { id: null };
