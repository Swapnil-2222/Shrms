import dayjs from 'dayjs/esm';

export interface IBanksDetails {
  id: number;
  accountNumber?: number | null;
  bankName?: string | null;
  branchTransCode?: string | null;
  taxNumber?: string | null;
  gstin?: string | null;
  tan?: string | null;
  branchName?: string | null;
  refTable?: string | null;
  refTableId?: number | null;
  companyId?: number | null;
  status?: string | null;
  lastModified?: dayjs.Dayjs | null;
  lastModifiedBy?: string | null;
}

export type NewBanksDetails = Omit<IBanksDetails, 'id'> & { id: null };
