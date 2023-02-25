import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IEsiDetails } from '../esi-details.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../esi-details.test-samples';

import { EsiDetailsService, RestEsiDetails } from './esi-details.service';

const requireRestSample: RestEsiDetails = {
  ...sampleWithRequiredData,
  lastModified: sampleWithRequiredData.lastModified?.toJSON(),
};

describe('EsiDetails Service', () => {
  let service: EsiDetailsService;
  let httpMock: HttpTestingController;
  let expectedResult: IEsiDetails | IEsiDetails[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(EsiDetailsService);
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

    it('should create a EsiDetails', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const esiDetails = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(esiDetails).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a EsiDetails', () => {
      const esiDetails = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(esiDetails).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a EsiDetails', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of EsiDetails', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a EsiDetails', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addEsiDetailsToCollectionIfMissing', () => {
      it('should add a EsiDetails to an empty array', () => {
        const esiDetails: IEsiDetails = sampleWithRequiredData;
        expectedResult = service.addEsiDetailsToCollectionIfMissing([], esiDetails);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(esiDetails);
      });

      it('should not add a EsiDetails to an array that contains it', () => {
        const esiDetails: IEsiDetails = sampleWithRequiredData;
        const esiDetailsCollection: IEsiDetails[] = [
          {
            ...esiDetails,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addEsiDetailsToCollectionIfMissing(esiDetailsCollection, esiDetails);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a EsiDetails to an array that doesn't contain it", () => {
        const esiDetails: IEsiDetails = sampleWithRequiredData;
        const esiDetailsCollection: IEsiDetails[] = [sampleWithPartialData];
        expectedResult = service.addEsiDetailsToCollectionIfMissing(esiDetailsCollection, esiDetails);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(esiDetails);
      });

      it('should add only unique EsiDetails to an array', () => {
        const esiDetailsArray: IEsiDetails[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const esiDetailsCollection: IEsiDetails[] = [sampleWithRequiredData];
        expectedResult = service.addEsiDetailsToCollectionIfMissing(esiDetailsCollection, ...esiDetailsArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const esiDetails: IEsiDetails = sampleWithRequiredData;
        const esiDetails2: IEsiDetails = sampleWithPartialData;
        expectedResult = service.addEsiDetailsToCollectionIfMissing([], esiDetails, esiDetails2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(esiDetails);
        expect(expectedResult).toContain(esiDetails2);
      });

      it('should accept null and undefined values', () => {
        const esiDetails: IEsiDetails = sampleWithRequiredData;
        expectedResult = service.addEsiDetailsToCollectionIfMissing([], null, esiDetails, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(esiDetails);
      });

      it('should return initial array if no EsiDetails is added', () => {
        const esiDetailsCollection: IEsiDetails[] = [sampleWithRequiredData];
        expectedResult = service.addEsiDetailsToCollectionIfMissing(esiDetailsCollection, undefined, null);
        expect(expectedResult).toEqual(esiDetailsCollection);
      });
    });

    describe('compareEsiDetails', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareEsiDetails(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareEsiDetails(entity1, entity2);
        const compareResult2 = service.compareEsiDetails(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareEsiDetails(entity1, entity2);
        const compareResult2 = service.compareEsiDetails(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareEsiDetails(entity1, entity2);
        const compareResult2 = service.compareEsiDetails(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
