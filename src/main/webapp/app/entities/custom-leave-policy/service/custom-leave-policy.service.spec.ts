import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ICustomLeavePolicy } from '../custom-leave-policy.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../custom-leave-policy.test-samples';

import { CustomLeavePolicyService, RestCustomLeavePolicy } from './custom-leave-policy.service';

const requireRestSample: RestCustomLeavePolicy = {
  ...sampleWithRequiredData,
  lastModified: sampleWithRequiredData.lastModified?.toJSON(),
};

describe('CustomLeavePolicy Service', () => {
  let service: CustomLeavePolicyService;
  let httpMock: HttpTestingController;
  let expectedResult: ICustomLeavePolicy | ICustomLeavePolicy[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(CustomLeavePolicyService);
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

    it('should create a CustomLeavePolicy', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const customLeavePolicy = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(customLeavePolicy).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a CustomLeavePolicy', () => {
      const customLeavePolicy = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(customLeavePolicy).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a CustomLeavePolicy', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of CustomLeavePolicy', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a CustomLeavePolicy', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addCustomLeavePolicyToCollectionIfMissing', () => {
      it('should add a CustomLeavePolicy to an empty array', () => {
        const customLeavePolicy: ICustomLeavePolicy = sampleWithRequiredData;
        expectedResult = service.addCustomLeavePolicyToCollectionIfMissing([], customLeavePolicy);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(customLeavePolicy);
      });

      it('should not add a CustomLeavePolicy to an array that contains it', () => {
        const customLeavePolicy: ICustomLeavePolicy = sampleWithRequiredData;
        const customLeavePolicyCollection: ICustomLeavePolicy[] = [
          {
            ...customLeavePolicy,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addCustomLeavePolicyToCollectionIfMissing(customLeavePolicyCollection, customLeavePolicy);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a CustomLeavePolicy to an array that doesn't contain it", () => {
        const customLeavePolicy: ICustomLeavePolicy = sampleWithRequiredData;
        const customLeavePolicyCollection: ICustomLeavePolicy[] = [sampleWithPartialData];
        expectedResult = service.addCustomLeavePolicyToCollectionIfMissing(customLeavePolicyCollection, customLeavePolicy);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(customLeavePolicy);
      });

      it('should add only unique CustomLeavePolicy to an array', () => {
        const customLeavePolicyArray: ICustomLeavePolicy[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const customLeavePolicyCollection: ICustomLeavePolicy[] = [sampleWithRequiredData];
        expectedResult = service.addCustomLeavePolicyToCollectionIfMissing(customLeavePolicyCollection, ...customLeavePolicyArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const customLeavePolicy: ICustomLeavePolicy = sampleWithRequiredData;
        const customLeavePolicy2: ICustomLeavePolicy = sampleWithPartialData;
        expectedResult = service.addCustomLeavePolicyToCollectionIfMissing([], customLeavePolicy, customLeavePolicy2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(customLeavePolicy);
        expect(expectedResult).toContain(customLeavePolicy2);
      });

      it('should accept null and undefined values', () => {
        const customLeavePolicy: ICustomLeavePolicy = sampleWithRequiredData;
        expectedResult = service.addCustomLeavePolicyToCollectionIfMissing([], null, customLeavePolicy, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(customLeavePolicy);
      });

      it('should return initial array if no CustomLeavePolicy is added', () => {
        const customLeavePolicyCollection: ICustomLeavePolicy[] = [sampleWithRequiredData];
        expectedResult = service.addCustomLeavePolicyToCollectionIfMissing(customLeavePolicyCollection, undefined, null);
        expect(expectedResult).toEqual(customLeavePolicyCollection);
      });
    });

    describe('compareCustomLeavePolicy', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareCustomLeavePolicy(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareCustomLeavePolicy(entity1, entity2);
        const compareResult2 = service.compareCustomLeavePolicy(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareCustomLeavePolicy(entity1, entity2);
        const compareResult2 = service.compareCustomLeavePolicy(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareCustomLeavePolicy(entity1, entity2);
        const compareResult2 = service.compareCustomLeavePolicy(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
