import dayjs from 'dayjs/esm';

export interface IPersonalDetails {
  id: number;
  telephoneNo?: string | null;
  nationality?: string | null;
  maritalStatus?: string | null;
  religion?: string | null;
  employeeId?: number | null;
  companyId?: number | null;
  bloodGroup?: string | null;
  dateOfBirth?: dayjs.Dayjs | null;
  status?: string | null;
  lastModified?: dayjs.Dayjs | null;
  lastModifiedBy?: string | null;
}

export type NewPersonalDetails = Omit<IPersonalDetails, 'id'> & { id: null };
