import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../banks-details.test-samples';

import { BanksDetailsFormService } from './banks-details-form.service';

describe('BanksDetails Form Service', () => {
  let service: BanksDetailsFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BanksDetailsFormService);
  });

  describe('Service methods', () => {
    describe('createBanksDetailsFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createBanksDetailsFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            accountNumber: expect.any(Object),
            bankName: expect.any(Object),
            branchTransCode: expect.any(Object),
            taxNumber: expect.any(Object),
            gstin: expect.any(Object),
            tan: expect.any(Object),
            branchName: expect.any(Object),
            refTable: expect.any(Object),
            refTableId: expect.any(Object),
            companyId: expect.any(Object),
            status: expect.any(Object),
            lastModified: expect.any(Object),
            lastModifiedBy: expect.any(Object),
          })
        );
      });

      it('passing IBanksDetails should create a new form with FormGroup', () => {
        const formGroup = service.createBanksDetailsFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            accountNumber: expect.any(Object),
            bankName: expect.any(Object),
            branchTransCode: expect.any(Object),
            taxNumber: expect.any(Object),
            gstin: expect.any(Object),
            tan: expect.any(Object),
            branchName: expect.any(Object),
            refTable: expect.any(Object),
            refTableId: expect.any(Object),
            companyId: expect.any(Object),
            status: expect.any(Object),
            lastModified: expect.any(Object),
            lastModifiedBy: expect.any(Object),
          })
        );
      });
    });

    describe('getBanksDetails', () => {
      it('should return NewBanksDetails for default BanksDetails initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createBanksDetailsFormGroup(sampleWithNewData);

        const banksDetails = service.getBanksDetails(formGroup) as any;

        expect(banksDetails).toMatchObject(sampleWithNewData);
      });

      it('should return NewBanksDetails for empty BanksDetails initial value', () => {
        const formGroup = service.createBanksDetailsFormGroup();

        const banksDetails = service.getBanksDetails(formGroup) as any;

        expect(banksDetails).toMatchObject({});
      });

      it('should return IBanksDetails', () => {
        const formGroup = service.createBanksDetailsFormGroup(sampleWithRequiredData);

        const banksDetails = service.getBanksDetails(formGroup) as any;

        expect(banksDetails).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IBanksDetails should not enable id FormControl', () => {
        const formGroup = service.createBanksDetailsFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewBanksDetails should disable id FormControl', () => {
        const formGroup = service.createBanksDetailsFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
