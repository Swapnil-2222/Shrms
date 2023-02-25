import dayjs from 'dayjs/esm';

export interface IDepartment {
  id: number;
  name?: string | null;
  companyId?: number | null;
  status?: string | null;
  lastModified?: dayjs.Dayjs | null;
  lastModifiedBy?: string | null;
}

export type NewDepartment = Omit<IDepartment, 'id'> & { id: null };
