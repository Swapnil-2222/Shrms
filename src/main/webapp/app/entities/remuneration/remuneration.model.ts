import dayjs from 'dayjs/esm';

export interface IRemuneration {
  id: number;
  salaryType?: string | null;
  amount?: number | null;
  paymentType?: string | null;
  employeId?: number | null;
  companyId?: number | null;
  status?: string | null;
  lastModified?: dayjs.Dayjs | null;
  lastModifiedBy?: string | null;
}

export type NewRemuneration = Omit<IRemuneration, 'id'> & { id: null };
