import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IEmploymentType } from '../employment-type.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../employment-type.test-samples';

import { EmploymentTypeService, RestEmploymentType } from './employment-type.service';

const requireRestSample: RestEmploymentType = {
  ...sampleWithRequiredData,
  lastModified: sampleWithRequiredData.lastModified?.toJSON(),
};

describe('EmploymentType Service', () => {
  let service: EmploymentTypeService;
  let httpMock: HttpTestingController;
  let expectedResult: IEmploymentType | IEmploymentType[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(EmploymentTypeService);
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

    it('should create a EmploymentType', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const employmentType = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(employmentType).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a EmploymentType', () => {
      const employmentType = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(employmentType).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a EmploymentType', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of EmploymentType', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a EmploymentType', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addEmploymentTypeToCollectionIfMissing', () => {
      it('should add a EmploymentType to an empty array', () => {
        const employmentType: IEmploymentType = sampleWithRequiredData;
        expectedResult = service.addEmploymentTypeToCollectionIfMissing([], employmentType);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(employmentType);
      });

      it('should not add a EmploymentType to an array that contains it', () => {
        const employmentType: IEmploymentType = sampleWithRequiredData;
        const employmentTypeCollection: IEmploymentType[] = [
          {
            ...employmentType,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addEmploymentTypeToCollectionIfMissing(employmentTypeCollection, employmentType);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a EmploymentType to an array that doesn't contain it", () => {
        const employmentType: IEmploymentType = sampleWithRequiredData;
        const employmentTypeCollection: IEmploymentType[] = [sampleWithPartialData];
        expectedResult = service.addEmploymentTypeToCollectionIfMissing(employmentTypeCollection, employmentType);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(employmentType);
      });

      it('should add only unique EmploymentType to an array', () => {
        const employmentTypeArray: IEmploymentType[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const employmentTypeCollection: IEmploymentType[] = [sampleWithRequiredData];
        expectedResult = service.addEmploymentTypeToCollectionIfMissing(employmentTypeCollection, ...employmentTypeArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const employmentType: IEmploymentType = sampleWithRequiredData;
        const employmentType2: IEmploymentType = sampleWithPartialData;
        expectedResult = service.addEmploymentTypeToCollectionIfMissing([], employmentType, employmentType2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(employmentType);
        expect(expectedResult).toContain(employmentType2);
      });

      it('should accept null and undefined values', () => {
        const employmentType: IEmploymentType = sampleWithRequiredData;
        expectedResult = service.addEmploymentTypeToCollectionIfMissing([], null, employmentType, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(employmentType);
      });

      it('should return initial array if no EmploymentType is added', () => {
        const employmentTypeCollection: IEmploymentType[] = [sampleWithRequiredData];
        expectedResult = service.addEmploymentTypeToCollectionIfMissing(employmentTypeCollection, undefined, null);
        expect(expectedResult).toEqual(employmentTypeCollection);
      });
    });

    describe('compareEmploymentType', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareEmploymentType(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareEmploymentType(entity1, entity2);
        const compareResult2 = service.compareEmploymentType(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareEmploymentType(entity1, entity2);
        const compareResult2 = service.compareEmploymentType(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareEmploymentType(entity1, entity2);
        const compareResult2 = service.compareEmploymentType(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
