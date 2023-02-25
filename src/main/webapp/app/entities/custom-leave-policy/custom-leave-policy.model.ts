import dayjs from 'dayjs/esm';

export interface ICustomLeavePolicy {
  id: number;
  leavePolicyId?: number | null;
  employeeId?: number | null;
  days?: number | null;
  companyId?: number | null;
  status?: string | null;
  lastModified?: dayjs.Dayjs | null;
  lastModifiedBy?: string | null;
}

export type NewCustomLeavePolicy = Omit<ICustomLeavePolicy, 'id'> & { id: null };
