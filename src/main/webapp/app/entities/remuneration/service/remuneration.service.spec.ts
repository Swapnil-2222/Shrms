import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IRemuneration } from '../remuneration.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../remuneration.test-samples';

import { RemunerationService, RestRemuneration } from './remuneration.service';

const requireRestSample: RestRemuneration = {
  ...sampleWithRequiredData,
  lastModified: sampleWithRequiredData.lastModified?.toJSON(),
};

describe('Remuneration Service', () => {
  let service: RemunerationService;
  let httpMock: HttpTestingController;
  let expectedResult: IRemuneration | IRemuneration[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(RemunerationService);
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

    it('should create a Remuneration', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const remuneration = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(remuneration).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Remuneration', () => {
      const remuneration = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(remuneration).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Remuneration', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Remuneration', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a Remuneration', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addRemunerationToCollectionIfMissing', () => {
      it('should add a Remuneration to an empty array', () => {
        const remuneration: IRemuneration = sampleWithRequiredData;
        expectedResult = service.addRemunerationToCollectionIfMissing([], remuneration);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(remuneration);
      });

      it('should not add a Remuneration to an array that contains it', () => {
        const remuneration: IRemuneration = sampleWithRequiredData;
        const remunerationCollection: IRemuneration[] = [
          {
            ...remuneration,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addRemunerationToCollectionIfMissing(remunerationCollection, remuneration);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Remuneration to an array that doesn't contain it", () => {
        const remuneration: IRemuneration = sampleWithRequiredData;
        const remunerationCollection: IRemuneration[] = [sampleWithPartialData];
        expectedResult = service.addRemunerationToCollectionIfMissing(remunerationCollection, remuneration);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(remuneration);
      });

      it('should add only unique Remuneration to an array', () => {
        const remunerationArray: IRemuneration[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const remunerationCollection: IRemuneration[] = [sampleWithRequiredData];
        expectedResult = service.addRemunerationToCollectionIfMissing(remunerationCollection, ...remunerationArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const remuneration: IRemuneration = sampleWithRequiredData;
        const remuneration2: IRemuneration = sampleWithPartialData;
        expectedResult = service.addRemunerationToCollectionIfMissing([], remuneration, remuneration2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(remuneration);
        expect(expectedResult).toContain(remuneration2);
      });

      it('should accept null and undefined values', () => {
        const remuneration: IRemuneration = sampleWithRequiredData;
        expectedResult = service.addRemunerationToCollectionIfMissing([], null, remuneration, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(remuneration);
      });

      it('should return initial array if no Remuneration is added', () => {
        const remunerationCollection: IRemuneration[] = [sampleWithRequiredData];
        expectedResult = service.addRemunerationToCollectionIfMissing(remunerationCollection, undefined, null);
        expect(expectedResult).toEqual(remunerationCollection);
      });
    });

    describe('compareRemuneration', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareRemuneration(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareRemuneration(entity1, entity2);
        const compareResult2 = service.compareRemuneration(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareRemuneration(entity1, entity2);
        const compareResult2 = service.compareRemuneration(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareRemuneration(entity1, entity2);
        const compareResult2 = service.compareRemuneration(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
