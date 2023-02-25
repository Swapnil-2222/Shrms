import dayjs from 'dayjs/esm';

export interface IEducation {
  id: number;
  institution?: string | null;
  subject?: string | null;
  startYear?: dayjs.Dayjs | null;
  endDate?: dayjs.Dayjs | null;
  educationType?: string | null;
  grade?: string | null;
  description?: string | null;
  employeeId?: number | null;
  companyId?: number | null;
  status?: string | null;
  lastModified?: dayjs.Dayjs | null;
  lastModifiedBy?: string | null;
}

export type NewEducation = Omit<IEducation, 'id'> & { id: null };
