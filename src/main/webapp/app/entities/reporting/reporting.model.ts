import dayjs from 'dayjs/esm';

export interface IReporting {
  id: number;
  employeeId?: number | null;
  reportingEmpId?: number | null;
  reportingId?: number | null;
  companyId?: number | null;
  status?: string | null;
  lastModified?: dayjs.Dayjs | null;
  lastModifiedBy?: string | null;
}

export type NewReporting = Omit<IReporting, 'id'> & { id: null };
