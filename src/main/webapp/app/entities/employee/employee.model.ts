import dayjs from 'dayjs/esm';

export interface IEmployee {
  id: number;
  firstName?: string | null;
  middleName?: string | null;
  lastName?: string | null;
  department?: string | null;
  designation?: string | null;
  gender?: string | null;
  empUniqueId?: string | null;
  joindate?: dayjs.Dayjs | null;
  companyId?: number | null;
  branchId?: number | null;
  regionId?: number | null;
  status?: string | null;
  lastModified?: dayjs.Dayjs | null;
  lastModifiedBy?: string | null;
  employmentTypeId?: number | null;
}

export type NewEmployee = Omit<IEmployee, 'id'> & { id: null };
