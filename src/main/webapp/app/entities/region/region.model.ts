import dayjs from 'dayjs/esm';

export interface IRegion {
  id: number;
  regionName?: string | null;
  description?: string | null;
  regionId?: number | null;
  companyId?: number | null;
  status?: string | null;
  lastModified?: dayjs.Dayjs | null;
  lastModifiedBy?: string | null;
}

export type NewRegion = Omit<IRegion, 'id'> & { id: null };
