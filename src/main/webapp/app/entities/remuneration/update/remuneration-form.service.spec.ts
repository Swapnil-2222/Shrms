import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../remuneration.test-samples';

import { RemunerationFormService } from './remuneration-form.service';

describe('Remuneration Form Service', () => {
  let service: RemunerationFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RemunerationFormService);
  });

  describe('Service methods', () => {
    describe('createRemunerationFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createRemunerationFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            salaryType: expect.any(Object),
            amount: expect.any(Object),
            paymentType: expect.any(Object),
            employeId: expect.any(Object),
            companyId: expect.any(Object),
            status: expect.any(Object),
            lastModified: expect.any(Object),
            lastModifiedBy: expect.any(Object),
          })
        );
      });

      it('passing IRemuneration should create a new form with FormGroup', () => {
        const formGroup = service.createRemunerationFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            salaryType: expect.any(Object),
            amount: expect.any(Object),
            paymentType: expect.any(Object),
            employeId: expect.any(Object),
            companyId: expect.any(Object),
            status: expect.any(Object),
            lastModified: expect.any(Object),
            lastModifiedBy: expect.any(Object),
          })
        );
      });
    });

    describe('getRemuneration', () => {
      it('should return NewRemuneration for default Remuneration initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createRemunerationFormGroup(sampleWithNewData);

        const remuneration = service.getRemuneration(formGroup) as any;

        expect(remuneration).toMatchObject(sampleWithNewData);
      });

      it('should return NewRemuneration for empty Remuneration initial value', () => {
        const formGroup = service.createRemunerationFormGroup();

        const remuneration = service.getRemuneration(formGroup) as any;

        expect(remuneration).toMatchObject({});
      });

      it('should return IRemuneration', () => {
        const formGroup = service.createRemunerationFormGroup(sampleWithRequiredData);

        const remuneration = service.getRemuneration(formGroup) as any;

        expect(remuneration).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IRemuneration should not enable id FormControl', () => {
        const formGroup = service.createRemunerationFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewRemuneration should disable id FormControl', () => {
        const formGroup = service.createRemunerationFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
