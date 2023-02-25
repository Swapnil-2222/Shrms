import dayjs from 'dayjs/esm';

export interface IApprovalLevel {
  id: number;
  name?: string | null;
  squence?: number | null;
  approvalSettingId?: number | null;
  companyId?: number | null;
  status?: string | null;
  lastModified?: dayjs.Dayjs | null;
  lastModifiedBy?: string | null;
}

export type NewApprovalLevel = Omit<IApprovalLevel, 'id'> & { id: null };
