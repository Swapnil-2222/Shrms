import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IBranch, NewBranch } from '../branch.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IBranch for edit and NewBranchFormGroupInput for create.
 */
type BranchFormGroupInput = IBranch | PartialWithRequiredKeyOf<NewBranch>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends IBranch | NewBranch> = Omit<T, 'lastModified'> & {
  lastModified?: string | null;
};

type BranchFormRawValue = FormValueOf<IBranch>;

type NewBranchFormRawValue = FormValueOf<NewBranch>;

type BranchFormDefaults = Pick<NewBranch, 'id' | 'lastModified'>;

type BranchFormGroupContent = {
  id: FormControl<BranchFormRawValue['id'] | NewBranch['id']>;
  branchName: FormControl<BranchFormRawValue['branchName']>;
  description: FormControl<BranchFormRawValue['description']>;
  branchcode: FormControl<BranchFormRawValue['branchcode']>;
  branchType: FormControl<BranchFormRawValue['branchType']>;
  webSite: FormControl<BranchFormRawValue['webSite']>;
  branchId: FormControl<BranchFormRawValue['branchId']>;
  regionId: FormControl<BranchFormRawValue['regionId']>;
  companyId: FormControl<BranchFormRawValue['companyId']>;
  status: FormControl<BranchFormRawValue['status']>;
  lastModified: FormControl<BranchFormRawValue['lastModified']>;
  lastModifiedBy: FormControl<BranchFormRawValue['lastModifiedBy']>;
};

export type BranchFormGroup = FormGroup<BranchFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class BranchFormService {
  createBranchFormGroup(branch: BranchFormGroupInput = { id: null }): BranchFormGroup {
    const branchRawValue = this.convertBranchToBranchRawValue({
      ...this.getFormDefaults(),
      ...branch,
    });
    return new FormGroup<BranchFormGroupContent>({
      id: new FormControl(
        { value: branchRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      branchName: new FormControl(branchRawValue.branchName, {
        validators: [Validators.required],
      }),
      description: new FormControl(branchRawValue.description),
      branchcode: new FormControl(branchRawValue.branchcode),
      branchType: new FormControl(branchRawValue.branchType),
      webSite: new FormControl(branchRawValue.webSite),
      branchId: new FormControl(branchRawValue.branchId),
      regionId: new FormControl(branchRawValue.regionId),
      companyId: new FormControl(branchRawValue.companyId),
      status: new FormControl(branchRawValue.status),
      lastModified: new FormControl(branchRawValue.lastModified),
      lastModifiedBy: new FormControl(branchRawValue.lastModifiedBy),
    });
  }

  getBranch(form: BranchFormGroup): IBranch | NewBranch {
    return this.convertBranchRawValueToBranch(form.getRawValue() as BranchFormRawValue | NewBranchFormRawValue);
  }

  resetForm(form: BranchFormGroup, branch: BranchFormGroupInput): void {
    const branchRawValue = this.convertBranchToBranchRawValue({ ...this.getFormDefaults(), ...branch });
    form.reset(
      {
        ...branchRawValue,
        id: { value: branchRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): BranchFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      lastModified: currentTime,
    };
  }

  private convertBranchRawValueToBranch(rawBranch: BranchFormRawValue | NewBranchFormRawValue): IBranch | NewBranch {
    return {
      ...rawBranch,
      lastModified: dayjs(rawBranch.lastModified, DATE_TIME_FORMAT),
    };
  }

  private convertBranchToBranchRawValue(
    branch: IBranch | (Partial<NewBranch> & BranchFormDefaults)
  ): BranchFormRawValue | PartialWithRequiredKeyOf<NewBranchFormRawValue> {
    return {
      ...branch,
      lastModified: branch.lastModified ? branch.lastModified.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
