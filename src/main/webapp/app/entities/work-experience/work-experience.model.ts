import dayjs from 'dayjs/esm';

export interface IWorkExperience {
  id: number;
  jobTitle?: string | null;
  companyName?: string | null;
  startDate?: dayjs.Dayjs | null;
  endDate?: dayjs.Dayjs | null;
  addressId?: number | null;
  employeeId?: number | null;
  companyId?: number | null;
  jobDesc?: string | null;
  status?: string | null;
  lastModified?: dayjs.Dayjs | null;
  lastModifiedBy?: string | null;
}

export type NewWorkExperience = Omit<IWorkExperience, 'id'> & { id: null };
