import dayjs from 'dayjs/esm';

export interface IBranch {
  id: number;
  branchName?: string | null;
  description?: string | null;
  branchcode?: string | null;
  branchType?: string | null;
  webSite?: string | null;
  branchId?: number | null;
  regionId?: number | null;
  companyId?: number | null;
  status?: string | null;
  lastModified?: dayjs.Dayjs | null;
  lastModifiedBy?: string | null;
}

export type NewBranch = Omit<IBranch, 'id'> & { id: null };
