import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IRegion, NewRegion } from '../region.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IRegion for edit and NewRegionFormGroupInput for create.
 */
type RegionFormGroupInput = IRegion | PartialWithRequiredKeyOf<NewRegion>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends IRegion | NewRegion> = Omit<T, 'lastModified'> & {
  lastModified?: string | null;
};

type RegionFormRawValue = FormValueOf<IRegion>;

type NewRegionFormRawValue = FormValueOf<NewRegion>;

type RegionFormDefaults = Pick<NewRegion, 'id' | 'lastModified'>;

type RegionFormGroupContent = {
  id: FormControl<RegionFormRawValue['id'] | NewRegion['id']>;
  regionName: FormControl<RegionFormRawValue['regionName']>;
  description: FormControl<RegionFormRawValue['description']>;
  regionId: FormControl<RegionFormRawValue['regionId']>;
  companyId: FormControl<RegionFormRawValue['companyId']>;
  status: FormControl<RegionFormRawValue['status']>;
  lastModified: FormControl<RegionFormRawValue['lastModified']>;
  lastModifiedBy: FormControl<RegionFormRawValue['lastModifiedBy']>;
};

export type RegionFormGroup = FormGroup<RegionFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class RegionFormService {
  createRegionFormGroup(region: RegionFormGroupInput = { id: null }): RegionFormGroup {
    const regionRawValue = this.convertRegionToRegionRawValue({
      ...this.getFormDefaults(),
      ...region,
    });
    return new FormGroup<RegionFormGroupContent>({
      id: new FormControl(
        { value: regionRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      regionName: new FormControl(regionRawValue.regionName, {
        validators: [Validators.required],
      }),
      description: new FormControl(regionRawValue.description),
      regionId: new FormControl(regionRawValue.regionId),
      companyId: new FormControl(regionRawValue.companyId),
      status: new FormControl(regionRawValue.status),
      lastModified: new FormControl(regionRawValue.lastModified),
      lastModifiedBy: new FormControl(regionRawValue.lastModifiedBy),
    });
  }

  getRegion(form: RegionFormGroup): IRegion | NewRegion {
    return this.convertRegionRawValueToRegion(form.getRawValue() as RegionFormRawValue | NewRegionFormRawValue);
  }

  resetForm(form: RegionFormGroup, region: RegionFormGroupInput): void {
    const regionRawValue = this.convertRegionToRegionRawValue({ ...this.getFormDefaults(), ...region });
    form.reset(
      {
        ...regionRawValue,
        id: { value: regionRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): RegionFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      lastModified: currentTime,
    };
  }

  private convertRegionRawValueToRegion(rawRegion: RegionFormRawValue | NewRegionFormRawValue): IRegion | NewRegion {
    return {
      ...rawRegion,
      lastModified: dayjs(rawRegion.lastModified, DATE_TIME_FORMAT),
    };
  }

  private convertRegionToRegionRawValue(
    region: IRegion | (Partial<NewRegion> & RegionFormDefaults)
  ): RegionFormRawValue | PartialWithRequiredKeyOf<NewRegionFormRawValue> {
    return {
      ...region,
      lastModified: region.lastModified ? region.lastModified.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
