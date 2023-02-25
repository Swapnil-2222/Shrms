import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IContacts, NewContacts } from '../contacts.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IContacts for edit and NewContactsFormGroupInput for create.
 */
type ContactsFormGroupInput = IContacts | PartialWithRequiredKeyOf<NewContacts>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends IContacts | NewContacts> = Omit<T, 'lastModified'> & {
  lastModified?: string | null;
};

type ContactsFormRawValue = FormValueOf<IContacts>;

type NewContactsFormRawValue = FormValueOf<NewContacts>;

type ContactsFormDefaults = Pick<NewContacts, 'id' | 'lastModified'>;

type ContactsFormGroupContent = {
  id: FormControl<ContactsFormRawValue['id'] | NewContacts['id']>;
  name: FormControl<ContactsFormRawValue['name']>;
  contactPref: FormControl<ContactsFormRawValue['contactPref']>;
  contactType: FormControl<ContactsFormRawValue['contactType']>;
  contact: FormControl<ContactsFormRawValue['contact']>;
  refTable: FormControl<ContactsFormRawValue['refTable']>;
  refTableId: FormControl<ContactsFormRawValue['refTableId']>;
  companyId: FormControl<ContactsFormRawValue['companyId']>;
  status: FormControl<ContactsFormRawValue['status']>;
  lastModified: FormControl<ContactsFormRawValue['lastModified']>;
  lastModifiedBy: FormControl<ContactsFormRawValue['lastModifiedBy']>;
  contactReference: FormControl<ContactsFormRawValue['contactReference']>;
};

export type ContactsFormGroup = FormGroup<ContactsFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class ContactsFormService {
  createContactsFormGroup(contacts: ContactsFormGroupInput = { id: null }): ContactsFormGroup {
    const contactsRawValue = this.convertContactsToContactsRawValue({
      ...this.getFormDefaults(),
      ...contacts,
    });
    return new FormGroup<ContactsFormGroupContent>({
      id: new FormControl(
        { value: contactsRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      name: new FormControl(contactsRawValue.name),
      contactPref: new FormControl(contactsRawValue.contactPref),
      contactType: new FormControl(contactsRawValue.contactType),
      contact: new FormControl(contactsRawValue.contact),
      refTable: new FormControl(contactsRawValue.refTable),
      refTableId: new FormControl(contactsRawValue.refTableId),
      companyId: new FormControl(contactsRawValue.companyId),
      status: new FormControl(contactsRawValue.status),
      lastModified: new FormControl(contactsRawValue.lastModified),
      lastModifiedBy: new FormControl(contactsRawValue.lastModifiedBy),
      contactReference: new FormControl(contactsRawValue.contactReference),
    });
  }

  getContacts(form: ContactsFormGroup): IContacts | NewContacts {
    return this.convertContactsRawValueToContacts(form.getRawValue() as ContactsFormRawValue | NewContactsFormRawValue);
  }

  resetForm(form: ContactsFormGroup, contacts: ContactsFormGroupInput): void {
    const contactsRawValue = this.convertContactsToContactsRawValue({ ...this.getFormDefaults(), ...contacts });
    form.reset(
      {
        ...contactsRawValue,
        id: { value: contactsRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): ContactsFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      lastModified: currentTime,
    };
  }

  private convertContactsRawValueToContacts(rawContacts: ContactsFormRawValue | NewContactsFormRawValue): IContacts | NewContacts {
    return {
      ...rawContacts,
      lastModified: dayjs(rawContacts.lastModified, DATE_TIME_FORMAT),
    };
  }

  private convertContactsToContactsRawValue(
    contacts: IContacts | (Partial<NewContacts> & ContactsFormDefaults)
  ): ContactsFormRawValue | PartialWithRequiredKeyOf<NewContactsFormRawValue> {
    return {
      ...contacts,
      lastModified: contacts.lastModified ? contacts.lastModified.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
