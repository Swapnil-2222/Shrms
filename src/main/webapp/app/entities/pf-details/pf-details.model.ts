import dayjs from 'dayjs/esm';

export interface IPfDetails {
  id: number;
  isPfContribution?: boolean | null;
  pfNumber?: string | null;
  pfRate?: number | null;
  additionalPfRate?: string | null;
  totalPfRate?: number | null;
  employeId?: number | null;
  reEnumerationId?: number | null;
  companyId?: number | null;
  status?: string | null;
  lastModified?: dayjs.Dayjs | null;
  lastModifiedBy?: string | null;
}

export type NewPfDetails = Omit<IPfDetails, 'id'> & { id: null };
