import dayjs from 'dayjs/esm';

export interface IApprovalSetting {
  id: number;
  type?: string | null;
  approvalCategory?: number | null;
  companyId?: number | null;
  status?: string | null;
  lastModified?: dayjs.Dayjs | null;
  lastModifiedBy?: string | null;
}

export type NewApprovalSetting = Omit<IApprovalSetting, 'id'> & { id: null };
