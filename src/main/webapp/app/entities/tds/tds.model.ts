import dayjs from 'dayjs/esm';

export interface ITds {
  id: number;
  salaryFrom?: dayjs.Dayjs | null;
  salaryTo?: dayjs.Dayjs | null;
  percentage?: number | null;
  salarySettingId?: number | null;
  companyId?: number | null;
  status?: string | null;
  lastModified?: dayjs.Dayjs | null;
  lastModifiedBy?: string | null;
}

export type NewTds = Omit<ITds, 'id'> & { id: null };
