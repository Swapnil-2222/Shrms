import dayjs from 'dayjs/esm';

export interface IWorkingHours {
  id: number;
  noOfHours?: string | null;
  employmentTypeId?: number | null;
  companyId?: number | null;
  status?: string | null;
  lastModified?: dayjs.Dayjs | null;
  lastModifiedBy?: string | null;
}

export type NewWorkingHours = Omit<IWorkingHours, 'id'> & { id: null };
