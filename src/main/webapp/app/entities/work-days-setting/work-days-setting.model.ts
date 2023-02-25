import dayjs from 'dayjs/esm';

export interface IWorkDaysSetting {
  id: number;
  day?: string | null;
  hours?: string | null;
  dayOff?: boolean | null;
  companyId?: number | null;
  status?: string | null;
  lastModified?: dayjs.Dayjs | null;
  lastModifiedBy?: string | null;
}

export type NewWorkDaysSetting = Omit<IWorkDaysSetting, 'id'> & { id: null };
