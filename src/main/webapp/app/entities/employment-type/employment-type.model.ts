import dayjs from 'dayjs/esm';

export interface IEmploymentType {
  id: number;
  name?: string | null;
  subtype?: string | null;
  companyId?: number | null;
  status?: string | null;
  lastModified?: dayjs.Dayjs | null;
  lastModifiedBy?: string | null;
}

export type NewEmploymentType = Omit<IEmploymentType, 'id'> & { id: null };
