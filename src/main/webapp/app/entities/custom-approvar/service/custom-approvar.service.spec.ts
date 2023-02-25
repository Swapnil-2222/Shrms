import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ICustomApprovar } from '../custom-approvar.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../custom-approvar.test-samples';

import { CustomApprovarService, RestCustomApprovar } from './custom-approvar.service';

const requireRestSample: RestCustomApprovar = {
  ...sampleWithRequiredData,
  lastModified: sampleWithRequiredData.lastModified?.toJSON(),
};

describe('CustomApprovar Service', () => {
  let service: CustomApprovarService;
  let httpMock: HttpTestingController;
  let expectedResult: ICustomApprovar | ICustomApprovar[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(CustomApprovarService);
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

    it('should create a CustomApprovar', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const customApprovar = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(customApprovar).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a CustomApprovar', () => {
      const customApprovar = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(customApprovar).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a CustomApprovar', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of CustomApprovar', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a CustomApprovar', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addCustomApprovarToCollectionIfMissing', () => {
      it('should add a CustomApprovar to an empty array', () => {
        const customApprovar: ICustomApprovar = sampleWithRequiredData;
        expectedResult = service.addCustomApprovarToCollectionIfMissing([], customApprovar);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(customApprovar);
      });

      it('should not add a CustomApprovar to an array that contains it', () => {
        const customApprovar: ICustomApprovar = sampleWithRequiredData;
        const customApprovarCollection: ICustomApprovar[] = [
          {
            ...customApprovar,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addCustomApprovarToCollectionIfMissing(customApprovarCollection, customApprovar);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a CustomApprovar to an array that doesn't contain it", () => {
        const customApprovar: ICustomApprovar = sampleWithRequiredData;
        const customApprovarCollection: ICustomApprovar[] = [sampleWithPartialData];
        expectedResult = service.addCustomApprovarToCollectionIfMissing(customApprovarCollection, customApprovar);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(customApprovar);
      });

      it('should add only unique CustomApprovar to an array', () => {
        const customApprovarArray: ICustomApprovar[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const customApprovarCollection: ICustomApprovar[] = [sampleWithRequiredData];
        expectedResult = service.addCustomApprovarToCollectionIfMissing(customApprovarCollection, ...customApprovarArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const customApprovar: ICustomApprovar = sampleWithRequiredData;
        const customApprovar2: ICustomApprovar = sampleWithPartialData;
        expectedResult = service.addCustomApprovarToCollectionIfMissing([], customApprovar, customApprovar2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(customApprovar);
        expect(expectedResult).toContain(customApprovar2);
      });

      it('should accept null and undefined values', () => {
        const customApprovar: ICustomApprovar = sampleWithRequiredData;
        expectedResult = service.addCustomApprovarToCollectionIfMissing([], null, customApprovar, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(customApprovar);
      });

      it('should return initial array if no CustomApprovar is added', () => {
        const customApprovarCollection: ICustomApprovar[] = [sampleWithRequiredData];
        expectedResult = service.addCustomApprovarToCollectionIfMissing(customApprovarCollection, undefined, null);
        expect(expectedResult).toEqual(customApprovarCollection);
      });
    });

    describe('compareCustomApprovar', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareCustomApprovar(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareCustomApprovar(entity1, entity2);
        const compareResult2 = service.compareCustomApprovar(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareCustomApprovar(entity1, entity2);
        const compareResult2 = service.compareCustomApprovar(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareCustomApprovar(entity1, entity2);
        const compareResult2 = service.compareCustomApprovar(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
