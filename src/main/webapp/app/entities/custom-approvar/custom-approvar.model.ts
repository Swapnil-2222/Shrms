import dayjs from 'dayjs/esm';

export interface ICustomApprovar {
  id: number;
  employeId?: number | null;
  approvalSettingId?: string | null;
  squence?: string | null;
  companyId?: number | null;
  status?: string | null;
  lastModified?: dayjs.Dayjs | null;
  lastModifiedBy?: string | null;
}

export type NewCustomApprovar = Omit<ICustomApprovar, 'id'> & { id: null };
