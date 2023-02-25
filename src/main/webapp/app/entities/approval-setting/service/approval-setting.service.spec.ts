import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IApprovalSetting } from '../approval-setting.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../approval-setting.test-samples';

import { ApprovalSettingService, RestApprovalSetting } from './approval-setting.service';

const requireRestSample: RestApprovalSetting = {
  ...sampleWithRequiredData,
  lastModified: sampleWithRequiredData.lastModified?.toJSON(),
};

describe('ApprovalSetting Service', () => {
  let service: ApprovalSettingService;
  let httpMock: HttpTestingController;
  let expectedResult: IApprovalSetting | IApprovalSetting[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(ApprovalSettingService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should create a ApprovalSetting', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const approvalSetting = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(approvalSetting).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a ApprovalSetting', () => {
      const approvalSetting = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(approvalSetting).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a ApprovalSetting', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of ApprovalSetting', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a ApprovalSetting', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addApprovalSettingToCollectionIfMissing', () => {
      it('should add a ApprovalSetting to an empty array', () => {
        const approvalSetting: IApprovalSetting = sampleWithRequiredData;
        expectedResult = service.addApprovalSettingToCollectionIfMissing([], approvalSetting);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(approvalSetting);
      });

      it('should not add a ApprovalSetting to an array that contains it', () => {
        const approvalSetting: IApprovalSetting = sampleWithRequiredData;
        const approvalSettingCollection: IApprovalSetting[] = [
          {
            ...approvalSetting,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addApprovalSettingToCollectionIfMissing(approvalSettingCollection, approvalSetting);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a ApprovalSetting to an array that doesn't contain it", () => {
        const approvalSetting: IApprovalSetting = sampleWithRequiredData;
        const approvalSettingCollection: IApprovalSetting[] = [sampleWithPartialData];
        expectedResult = service.addApprovalSettingToCollectionIfMissing(approvalSettingCollection, approvalSetting);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(approvalSetting);
      });

      it('should add only unique ApprovalSetting to an array', () => {
        const approvalSettingArray: IApprovalSetting[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const approvalSettingCollection: IApprovalSetting[] = [sampleWithRequiredData];
        expectedResult = service.addApprovalSettingToCollectionIfMissing(approvalSettingCollection, ...approvalSettingArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const approvalSetting: IApprovalSetting = sampleWithRequiredData;
        const approvalSetting2: IApprovalSetting = sampleWithPartialData;
        expectedResult = service.addApprovalSettingToCollectionIfMissing([], approvalSetting, approvalSetting2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(approvalSetting);
        expect(expectedResult).toContain(approvalSetting2);
      });

      it('should accept null and undefined values', () => {
        const approvalSetting: IApprovalSetting = sampleWithRequiredData;
        expectedResult = service.addApprovalSettingToCollectionIfMissing([], null, approvalSetting, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(approvalSetting);
      });

      it('should return initial array if no ApprovalSetting is added', () => {
        const approvalSettingCollection: IApprovalSetting[] = [sampleWithRequiredData];
        expectedResult = service.addApprovalSettingToCollectionIfMissing(approvalSettingCollection, undefined, null);
        expect(expectedResult).toEqual(approvalSettingCollection);
      });
    });

    describe('compareApprovalSetting', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareApprovalSetting(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareApprovalSetting(entity1, entity2);
        const compareResult2 = service.compareApprovalSetting(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareApprovalSetting(entity1, entity2);
        const compareResult2 = service.compareApprovalSetting(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareApprovalSetting(entity1, entity2);
        const compareResult2 = service.compareApprovalSetting(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
