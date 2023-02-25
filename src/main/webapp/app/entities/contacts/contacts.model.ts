import dayjs from 'dayjs/esm';

export interface IContacts {
  id: number;
  name?: string | null;
  contactPref?: string | null;
  contactType?: string | null;
  contact?: string | null;
  refTable?: string | null;
  refTableId?: number | null;
  companyId?: number | null;
  status?: string | null;
  lastModified?: dayjs.Dayjs | null;
  lastModifiedBy?: string | null;
  contactReference?: string | null;
}

export type NewContacts = Omit<IContacts, 'id'> & { id: null };
