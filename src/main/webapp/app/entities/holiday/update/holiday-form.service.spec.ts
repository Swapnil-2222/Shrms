import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../holiday.test-samples';

import { HolidayFormService } from './holiday-form.service';

describe('Holiday Form Service', () => {
  let service: HolidayFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HolidayFormService);
  });

  describe('Service methods', () => {
    describe('createHolidayFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createHolidayFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            holidayName: expect.any(Object),
            holidayDate: expect.any(Object),
            day: expect.any(Object),
            year: expect.any(Object),
            companyId: expect.any(Object),
            status: expect.any(Object),
            lastModified: expect.any(Object),
            lastModifiedBy: expect.any(Object),
          })
        );
      });

      it('passing IHoliday should create a new form with FormGroup', () => {
        const formGroup = service.createHolidayFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            holidayName: expect.any(Object),
            holidayDate: expect.any(Object),
            day: expect.any(Object),
            year: expect.any(Object),
            companyId: expect.any(Object),
            status: expect.any(Object),
            lastModified: expect.any(Object),
            lastModifiedBy: expect.any(Object),
          })
        );
      });
    });

    describe('getHoliday', () => {
      it('should return NewHoliday for default Holiday initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createHolidayFormGroup(sampleWithNewData);

        const holiday = service.getHoliday(formGroup) as any;

        expect(holiday).toMatchObject(sampleWithNewData);
      });

      it('should return NewHoliday for empty Holiday initial value', () => {
        const formGroup = service.createHolidayFormGroup();

        const holiday = service.getHoliday(formGroup) as any;

        expect(holiday).toMatchObject({});
      });

      it('should return IHoliday', () => {
        const formGroup = service.createHolidayFormGroup(sampleWithRequiredData);

        const holiday = service.getHoliday(formGroup) as any;

        expect(holiday).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IHoliday should not enable id FormControl', () => {
        const formGroup = service.createHolidayFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewHoliday should disable id FormControl', () => {
        const formGroup = service.createHolidayFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
