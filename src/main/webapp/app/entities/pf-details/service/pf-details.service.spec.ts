import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IPfDetails } from '../pf-details.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../pf-details.test-samples';

import { PfDetailsService, RestPfDetails } from './pf-details.service';

const requireRestSample: RestPfDetails = {
  ...sampleWithRequiredData,
  lastModified: sampleWithRequiredData.lastModified?.toJSON(),
};

describe('PfDetails Service', () => {
  let service: PfDetailsService;
  let httpMock: HttpTestingController;
  let expectedResult: IPfDetails | IPfDetails[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(PfDetailsService);
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

    it('should create a PfDetails', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const pfDetails = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(pfDetails).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a PfDetails', () => {
      const pfDetails = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(pfDetails).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a PfDetails', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of PfDetails', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a PfDetails', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addPfDetailsToCollectionIfMissing', () => {
      it('should add a PfDetails to an empty array', () => {
        const pfDetails: IPfDetails = sampleWithRequiredData;
        expectedResult = service.addPfDetailsToCollectionIfMissing([], pfDetails);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(pfDetails);
      });

      it('should not add a PfDetails to an array that contains it', () => {
        const pfDetails: IPfDetails = sampleWithRequiredData;
        const pfDetailsCollection: IPfDetails[] = [
          {
            ...pfDetails,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addPfDetailsToCollectionIfMissing(pfDetailsCollection, pfDetails);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a PfDetails to an array that doesn't contain it", () => {
        const pfDetails: IPfDetails = sampleWithRequiredData;
        const pfDetailsCollection: IPfDetails[] = [sampleWithPartialData];
        expectedResult = service.addPfDetailsToCollectionIfMissing(pfDetailsCollection, pfDetails);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(pfDetails);
      });

      it('should add only unique PfDetails to an array', () => {
        const pfDetailsArray: IPfDetails[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const pfDetailsCollection: IPfDetails[] = [sampleWithRequiredData];
        expectedResult = service.addPfDetailsToCollectionIfMissing(pfDetailsCollection, ...pfDetailsArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const pfDetails: IPfDetails = sampleWithRequiredData;
        const pfDetails2: IPfDetails = sampleWithPartialData;
        expectedResult = service.addPfDetailsToCollectionIfMissing([], pfDetails, pfDetails2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(pfDetails);
        expect(expectedResult).toContain(pfDetails2);
      });

      it('should accept null and undefined values', () => {
        const pfDetails: IPfDetails = sampleWithRequiredData;
        expectedResult = service.addPfDetailsToCollectionIfMissing([], null, pfDetails, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(pfDetails);
      });

      it('should return initial array if no PfDetails is added', () => {
        const pfDetailsCollection: IPfDetails[] = [sampleWithRequiredData];
        expectedResult = service.addPfDetailsToCollectionIfMissing(pfDetailsCollection, undefined, null);
        expect(expectedResult).toEqual(pfDetailsCollection);
      });
    });

    describe('comparePfDetails', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.comparePfDetails(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.comparePfDetails(entity1, entity2);
        const compareResult2 = service.comparePfDetails(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.comparePfDetails(entity1, entity2);
        const compareResult2 = service.comparePfDetails(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.comparePfDetails(entity1, entity2);
        const compareResult2 = service.comparePfDetails(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
