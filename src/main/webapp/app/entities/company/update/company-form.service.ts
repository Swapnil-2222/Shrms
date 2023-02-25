import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { ICompany, NewCompany } from '../company.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ICompany for edit and NewCompanyFormGroupInput for create.
 */
type CompanyFormGroupInput = ICompany | PartialWithRequiredKeyOf<NewCompany>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends ICompany | NewCompany> = Omit<T, 'lastModified'> & {
  lastModified?: string | null;
};

type CompanyFormRawValue = FormValueOf<ICompany>;

type NewCompanyFormRawValue = FormValueOf<NewCompany>;

type CompanyFormDefaults = Pick<NewCompany, 'id' | 'lastModified'>;

type CompanyFormGroupContent = {
  id: FormControl<CompanyFormRawValue['id'] | NewCompany['id']>;
  companyName: FormControl<CompanyFormRawValue['companyName']>;
  contactPerson: FormControl<CompanyFormRawValue['contactPerson']>;
  postalCode: FormControl<CompanyFormRawValue['postalCode']>;
  email: FormControl<CompanyFormRawValue['email']>;
  phoneNumber: FormControl<CompanyFormRawValue['phoneNumber']>;
  mobileNumber: FormControl<CompanyFormRawValue['mobileNumber']>;
  websiteUrl: FormControl<CompanyFormRawValue['websiteUrl']>;
  fax: FormControl<CompanyFormRawValue['fax']>;
  regNumber: FormControl<CompanyFormRawValue['regNumber']>;
  status: FormControl<CompanyFormRawValue['status']>;
  lastModified: FormControl<CompanyFormRawValue['lastModified']>;
  lastModifiedBy: FormControl<CompanyFormRawValue['lastModifiedBy']>;
};

export type CompanyFormGroup = FormGroup<CompanyFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class CompanyFormService {
  createCompanyFormGroup(company: CompanyFormGroupInput = { id: null }): CompanyFormGroup {
    const companyRawValue = this.convertCompanyToCompanyRawValue({
      ...this.getFormDefaults(),
      ...company,
    });
    return new FormGroup<CompanyFormGroupContent>({
      id: new FormControl(
        { value: companyRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      companyName: new FormControl(companyRawValue.companyName),
      contactPerson: new FormControl(companyRawValue.contactPerson),
      postalCode: new FormControl(companyRawValue.postalCode),
      email: new FormControl(companyRawValue.email),
      phoneNumber: new FormControl(companyRawValue.phoneNumber),
      mobileNumber: new FormControl(companyRawValue.mobileNumber),
      websiteUrl: new FormControl(companyRawValue.websiteUrl),
      fax: new FormControl(companyRawValue.fax),
      regNumber: new FormControl(companyRawValue.regNumber),
      status: new FormControl(companyRawValue.status),
      lastModified: new FormControl(companyRawValue.lastModified),
      lastModifiedBy: new FormControl(companyRawValue.lastModifiedBy),
    });
  }

  getCompany(form: CompanyFormGroup): ICompany | NewCompany {
    return this.convertCompanyRawValueToCompany(form.getRawValue() as CompanyFormRawValue | NewCompanyFormRawValue);
  }

  resetForm(form: CompanyFormGroup, company: CompanyFormGroupInput): void {
    const companyRawValue = this.convertCompanyToCompanyRawValue({ ...this.getFormDefaults(), ...company });
    form.reset(
      {
        ...companyRawValue,
        id: { value: companyRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): CompanyFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      lastModified: currentTime,
    };
  }

  private convertCompanyRawValueToCompany(rawCompany: CompanyFormRawValue | NewCompanyFormRawValue): ICompany | NewCompany {
    return {
      ...rawCompany,
      lastModified: dayjs(rawCompany.lastModified, DATE_TIME_FORMAT),
    };
  }

  private convertCompanyToCompanyRawValue(
    company: ICompany | (Partial<NewCompany> & CompanyFormDefaults)
  ): CompanyFormRawValue | PartialWithRequiredKeyOf<NewCompanyFormRawValue> {
    return {
      ...company,
      lastModified: company.lastModified ? company.lastModified.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
