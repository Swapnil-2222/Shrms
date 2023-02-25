import dayjs from 'dayjs/esm';

export interface IEmployeeLeaveAccount {
  id: number;
  leaveTypeId?: number | null;
  employeeId?: number | null;
  carriedLeaves?: string | null;
  creditedLeaves?: string | null;
  date?: dayjs.Dayjs | null;
  balance?: string | null;
  companyId?: number | null;
  status?: string | null;
  lastModified?: dayjs.Dayjs | null;
  lastModifiedBy?: string | null;
}

export type NewEmployeeLeaveAccount = Omit<IEmployeeLeaveAccount, 'id'> & { id: null };
