import dayjs from 'dayjs/esm';

export interface ILeaveType {
  id: number;
  leaveType?: string | null;
  noOfDays?: string | null;
  companyId?: number | null;
  status?: string | null;
  lastModified?: dayjs.Dayjs | null;
  lastModifiedBy?: string | null;
  hasCarryForward?: boolean | null;
  hasEarned?: boolean | null;
  hasCustomPolicy?: boolean | null;
}

export type NewLeaveType = Omit<ILeaveType, 'id'> & { id: null };
