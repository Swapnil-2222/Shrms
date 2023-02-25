import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../work-days-setting.test-samples';

import { WorkDaysSettingFormService } from './work-days-setting-form.service';

describe('WorkDaysSetting Form Service', () => {
  let service: WorkDaysSettingFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkDaysSettingFormService);
  });

  describe('Service methods', () => {
    describe('createWorkDaysSettingFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createWorkDaysSettingFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            day: expect.any(Object),
            hours: expect.any(Object),
            dayOff: expect.any(Object),
            companyId: expect.any(Object),
            status: expect.any(Object),
            lastModified: expect.any(Object),
            lastModifiedBy: expect.any(Object),
          })
        );
      });

      it('passing IWorkDaysSetting should create a new form with FormGroup', () => {
        const formGroup = service.createWorkDaysSettingFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            day: expect.any(Object),
            hours: expect.any(Object),
            dayOff: expect.any(Object),
            companyId: expect.any(Object),
            status: expect.any(Object),
            lastModified: expect.any(Object),
            lastModifiedBy: expect.any(Object),
          })
        );
      });
    });

    describe('getWorkDaysSetting', () => {
      it('should return NewWorkDaysSetting for default WorkDaysSetting initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createWorkDaysSettingFormGroup(sampleWithNewData);

        const workDaysSetting = service.getWorkDaysSetting(formGroup) as any;

        expect(workDaysSetting).toMatchObject(sampleWithNewData);
      });

      it('should return NewWorkDaysSetting for empty WorkDaysSetting initial value', () => {
        const formGroup = service.createWorkDaysSettingFormGroup();

        const workDaysSetting = service.getWorkDaysSetting(formGroup) as any;

        expect(workDaysSetting).toMatchObject({});
      });

      it('should return IWorkDaysSetting', () => {
        const formGroup = service.createWorkDaysSettingFormGroup(sampleWithRequiredData);

        const workDaysSetting = service.getWorkDaysSetting(formGroup) as any;

        expect(workDaysSetting).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IWorkDaysSetting should not enable id FormControl', () => {
        const formGroup = service.createWorkDaysSettingFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewWorkDaysSetting should disable id FormControl', () => {
        const formGroup = service.createWorkDaysSettingFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
