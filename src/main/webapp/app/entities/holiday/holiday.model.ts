import dayjs from 'dayjs/esm';

export interface IHoliday {
  id: number;
  holidayName?: string | null;
  holidayDate?: dayjs.Dayjs | null;
  day?: string | null;
  year?: dayjs.Dayjs | null;
  companyId?: number | null;
  status?: string | null;
  lastModified?: dayjs.Dayjs | null;
  lastModifiedBy?: string | null;
}

export type NewHoliday = Omit<IHoliday, 'id'> & { id: null };
