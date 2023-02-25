import dayjs from 'dayjs/esm';

export interface IEsiDetails {
  id: number;
  isEsiContribution?: boolean | null;
  esiNumber?: string | null;
  esiRate?: number | null;
  additionalEsiRate?: string | null;
  totalEsiRate?: number | null;
  employeId?: number | null;
  reEnumerationId?: number | null;
  companyId?: number | null;
  status?: string | null;
  lastModified?: dayjs.Dayjs | null;
  lastModifiedBy?: string | null;
}

export type NewEsiDetails = Omit<IEsiDetails, 'id'> & { id: null };
