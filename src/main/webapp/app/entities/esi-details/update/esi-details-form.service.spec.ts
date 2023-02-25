import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../esi-details.test-samples';

import { EsiDetailsFormService } from './esi-details-form.service';

describe('EsiDetails Form Service', () => {
  let service: EsiDetailsFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EsiDetailsFormService);
  });

  describe('Service methods', () => {
    describe('createEsiDetailsFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createEsiDetailsFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            isEsiContribution: expect.any(Object),
            esiNumber: expect.any(Object),
            esiRate: expect.any(Object),
            additionalEsiRate: expect.any(Object),
            totalEsiRate: expect.any(Object),
            employeId: expect.any(Object),
            reEnumerationId: expect.any(Object),
            companyId: expect.any(Object),
            status: expect.any(Object),
            lastModified: expect.any(Object),
            lastModifiedBy: expect.any(Object),
          })
        );
      });

      it('passing IEsiDetails should create a new form with FormGroup', () => {
        const formGroup = service.createEsiDetailsFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            isEsiContribution: expect.any(Object),
            esiNumber: expect.any(Object),
            esiRate: expect.any(Object),
            additionalEsiRate: expect.any(Object),
            totalEsiRate: expect.any(Object),
            employeId: expect.any(Object),
            reEnumerationId: expect.any(Object),
            companyId: expect.any(Object),
            status: expect.any(Object),
            lastModified: expect.any(Object),
            lastModifiedBy: expect.any(Object),
          })
        );
      });
    });

    describe('getEsiDetails', () => {
      it('should return NewEsiDetails for default EsiDetails initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createEsiDetailsFormGroup(sampleWithNewData);

        const esiDetails = service.getEsiDetails(formGroup) as any;

        expect(esiDetails).toMatchObject(sampleWithNewData);
      });

      it('should return NewEsiDetails for empty EsiDetails initial value', () => {
        const formGroup = service.createEsiDetailsFormGroup();

        const esiDetails = service.getEsiDetails(formGroup) as any;

        expect(esiDetails).toMatchObject({});
      });

      it('should return IEsiDetails', () => {
        const formGroup = service.createEsiDetailsFormGroup(sampleWithRequiredData);

        const esiDetails = service.getEsiDetails(formGroup) as any;

        expect(esiDetails).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IEsiDetails should not enable id FormControl', () => {
        const formGroup = service.createEsiDetailsFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewEsiDetails should disable id FormControl', () => {
        const formGroup = service.createEsiDetailsFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
