import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IApprovalLevel } from '../approval-level.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../approval-level.test-samples';

import { ApprovalLevelService, RestApprovalLevel } from './approval-level.service';

const requireRestSample: RestApprovalLevel = {
  ...sampleWithRequiredData,
  lastModified: sampleWithRequiredData.lastModified?.toJSON(),
};

describe('ApprovalLevel Service', () => {
  let service: ApprovalLevelService;
  let httpMock: HttpTestingController;
  let expectedResult: IApprovalLevel | IApprovalLevel[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(ApprovalLevelService);
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

    it('should create a ApprovalLevel', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const approvalLevel = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(approvalLevel).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a ApprovalLevel', () => {
      const approvalLevel = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(approvalLevel).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a ApprovalLevel', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of ApprovalLevel', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a ApprovalLevel', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addApprovalLevelToCollectionIfMissing', () => {
      it('should add a ApprovalLevel to an empty array', () => {
        const approvalLevel: IApprovalLevel = sampleWithRequiredData;
        expectedResult = service.addApprovalLevelToCollectionIfMissing([], approvalLevel);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(approvalLevel);
      });

      it('should not add a ApprovalLevel to an array that contains it', () => {
        const approvalLevel: IApprovalLevel = sampleWithRequiredData;
        const approvalLevelCollection: IApprovalLevel[] = [
          {
            ...approvalLevel,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addApprovalLevelToCollectionIfMissing(approvalLevelCollection, approvalLevel);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a ApprovalLevel to an array that doesn't contain it", () => {
        const approvalLevel: IApprovalLevel = sampleWithRequiredData;
        const approvalLevelCollection: IApprovalLevel[] = [sampleWithPartialData];
        expectedResult = service.addApprovalLevelToCollectionIfMissing(approvalLevelCollection, approvalLevel);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(approvalLevel);
      });

      it('should add only unique ApprovalLevel to an array', () => {
        const approvalLevelArray: IApprovalLevel[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const approvalLevelCollection: IApprovalLevel[] = [sampleWithRequiredData];
        expectedResult = service.addApprovalLevelToCollectionIfMissing(approvalLevelCollection, ...approvalLevelArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const approvalLevel: IApprovalLevel = sampleWithRequiredData;
        const approvalLevel2: IApprovalLevel = sampleWithPartialData;
        expectedResult = service.addApprovalLevelToCollectionIfMissing([], approvalLevel, approvalLevel2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(approvalLevel);
        expect(expectedResult).toContain(approvalLevel2);
      });

      it('should accept null and undefined values', () => {
        const approvalLevel: IApprovalLevel = sampleWithRequiredData;
        expectedResult = service.addApprovalLevelToCollectionIfMissing([], null, approvalLevel, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(approvalLevel);
      });

      it('should return initial array if no ApprovalLevel is added', () => {
        const approvalLevelCollection: IApprovalLevel[] = [sampleWithRequiredData];
        expectedResult = service.addApprovalLevelToCollectionIfMissing(approvalLevelCollection, undefined, null);
        expect(expectedResult).toEqual(approvalLevelCollection);
      });
    });

    describe('compareApprovalLevel', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareApprovalLevel(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareApprovalLevel(entity1, entity2);
        const compareResult2 = service.compareApprovalLevel(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareApprovalLevel(entity1, entity2);
        const compareResult2 = service.compareApprovalLevel(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareApprovalLevel(entity1, entity2);
        const compareResult2 = service.compareApprovalLevel(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
