import dayjs from 'dayjs/esm';

export interface ILeavePolicy {
  id: number;
  leaveType?: string | null;
  isCarryForword?: boolean | null;
  employeeType?: string | null;
  genderLeave?: string | null;
  totalLeave?: string | null;
  maxLeave?: string | null;
  hasproRataLeave?: boolean | null;
  description?: string | null;
  companyId?: number | null;
  status?: string | null;
  lastModified?: dayjs.Dayjs | null;
  lastModifiedBy?: string | null;
}

export type NewLeavePolicy = Omit<ILeavePolicy, 'id'> & { id: null };
