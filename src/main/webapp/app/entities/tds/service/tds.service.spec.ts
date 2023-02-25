import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ITds } from '../tds.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../tds.test-samples';

import { TdsService, RestTds } from './tds.service';

const requireRestSample: RestTds = {
  ...sampleWithRequiredData,
  salaryFrom: sampleWithRequiredData.salaryFrom?.toJSON(),
  salaryTo: sampleWithRequiredData.salaryTo?.toJSON(),
  lastModified: sampleWithRequiredData.lastModified?.toJSON(),
};

describe('Tds Service', () => {
  let service: TdsService;
  let httpMock: HttpTestingController;
  let expectedResult: ITds | ITds[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(TdsService);
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

    it('should create a Tds', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const tds = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(tds).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Tds', () => {
      const tds = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(tds).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Tds', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Tds', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a Tds', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addTdsToCollectionIfMissing', () => {
      it('should add a Tds to an empty array', () => {
        const tds: ITds = sampleWithRequiredData;
        expectedResult = service.addTdsToCollectionIfMissing([], tds);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(tds);
      });

      it('should not add a Tds to an array that contains it', () => {
        const tds: ITds = sampleWithRequiredData;
        const tdsCollection: ITds[] = [
          {
            ...tds,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addTdsToCollectionIfMissing(tdsCollection, tds);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Tds to an array that doesn't contain it", () => {
        const tds: ITds = sampleWithRequiredData;
        const tdsCollection: ITds[] = [sampleWithPartialData];
        expectedResult = service.addTdsToCollectionIfMissing(tdsCollection, tds);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(tds);
      });

      it('should add only unique Tds to an array', () => {
        const tdsArray: ITds[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const tdsCollection: ITds[] = [sampleWithRequiredData];
        expectedResult = service.addTdsToCollectionIfMissing(tdsCollection, ...tdsArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const tds: ITds = sampleWithRequiredData;
        const tds2: ITds = sampleWithPartialData;
        expectedResult = service.addTdsToCollectionIfMissing([], tds, tds2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(tds);
        expect(expectedResult).toContain(tds2);
      });

      it('should accept null and undefined values', () => {
        const tds: ITds = sampleWithRequiredData;
        expectedResult = service.addTdsToCollectionIfMissing([], null, tds, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(tds);
      });

      it('should return initial array if no Tds is added', () => {
        const tdsCollection: ITds[] = [sampleWithRequiredData];
        expectedResult = service.addTdsToCollectionIfMissing(tdsCollection, undefined, null);
        expect(expectedResult).toEqual(tdsCollection);
      });
    });

    describe('compareTds', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareTds(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareTds(entity1, entity2);
        const compareResult2 = service.compareTds(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareTds(entity1, entity2);
        const compareResult2 = service.compareTds(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareTds(entity1, entity2);
        const compareResult2 = service.compareTds(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
