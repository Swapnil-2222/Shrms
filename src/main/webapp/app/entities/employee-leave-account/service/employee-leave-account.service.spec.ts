import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IEmployeeLeaveAccount } from '../employee-leave-account.model';
import {
  sampleWithRequiredData,
  sampleWithNewData,
  sampleWithPartialData,
  sampleWithFullData,
} from '../employee-leave-account.test-samples';

import { EmployeeLeaveAccountService, RestEmployeeLeaveAccount } from './employee-leave-account.service';

const requireRestSample: RestEmployeeLeaveAccount = {
  ...sampleWithRequiredData,
  date: sampleWithRequiredData.date?.toJSON(),
  lastModified: sampleWithRequiredData.lastModified?.toJSON(),
};

describe('EmployeeLeaveAccount Service', () => {
  let service: EmployeeLeaveAccountService;
  let httpMock: HttpTestingController;
  let expectedResult: IEmployeeLeaveAccount | IEmployeeLeaveAccount[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(EmployeeLeaveAccountService);
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

    it('should create a EmployeeLeaveAccount', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const employeeLeaveAccount = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(employeeLeaveAccount).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a EmployeeLeaveAccount', () => {
      const employeeLeaveAccount = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(employeeLeaveAccount).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a EmployeeLeaveAccount', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of EmployeeLeaveAccount', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a EmployeeLeaveAccount', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addEmployeeLeaveAccountToCollectionIfMissing', () => {
      it('should add a EmployeeLeaveAccount to an empty array', () => {
        const employeeLeaveAccount: IEmployeeLeaveAccount = sampleWithRequiredData;
        expectedResult = service.addEmployeeLeaveAccountToCollectionIfMissing([], employeeLeaveAccount);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(employeeLeaveAccount);
      });

      it('should not add a EmployeeLeaveAccount to an array that contains it', () => {
        const employeeLeaveAccount: IEmployeeLeaveAccount = sampleWithRequiredData;
        const employeeLeaveAccountCollection: IEmployeeLeaveAccount[] = [
          {
            ...employeeLeaveAccount,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addEmployeeLeaveAccountToCollectionIfMissing(employeeLeaveAccountCollection, employeeLeaveAccount);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a EmployeeLeaveAccount to an array that doesn't contain it", () => {
        const employeeLeaveAccount: IEmployeeLeaveAccount = sampleWithRequiredData;
        const employeeLeaveAccountCollection: IEmployeeLeaveAccount[] = [sampleWithPartialData];
        expectedResult = service.addEmployeeLeaveAccountToCollectionIfMissing(employeeLeaveAccountCollection, employeeLeaveAccount);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(employeeLeaveAccount);
      });

      it('should add only unique EmployeeLeaveAccount to an array', () => {
        const employeeLeaveAccountArray: IEmployeeLeaveAccount[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const employeeLeaveAccountCollection: IEmployeeLeaveAccount[] = [sampleWithRequiredData];
        expectedResult = service.addEmployeeLeaveAccountToCollectionIfMissing(employeeLeaveAccountCollection, ...employeeLeaveAccountArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const employeeLeaveAccount: IEmployeeLeaveAccount = sampleWithRequiredData;
        const employeeLeaveAccount2: IEmployeeLeaveAccount = sampleWithPartialData;
        expectedResult = service.addEmployeeLeaveAccountToCollectionIfMissing([], employeeLeaveAccount, employeeLeaveAccount2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(employeeLeaveAccount);
        expect(expectedResult).toContain(employeeLeaveAccount2);
      });

      it('should accept null and undefined values', () => {
        const employeeLeaveAccount: IEmployeeLeaveAccount = sampleWithRequiredData;
        expectedResult = service.addEmployeeLeaveAccountToCollectionIfMissing([], null, employeeLeaveAccount, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(employeeLeaveAccount);
      });

      it('should return initial array if no EmployeeLeaveAccount is added', () => {
        const employeeLeaveAccountCollection: IEmployeeLeaveAccount[] = [sampleWithRequiredData];
        expectedResult = service.addEmployeeLeaveAccountToCollectionIfMissing(employeeLeaveAccountCollection, undefined, null);
        expect(expectedResult).toEqual(employeeLeaveAccountCollection);
      });
    });

    describe('compareEmployeeLeaveAccount', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareEmployeeLeaveAccount(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareEmployeeLeaveAccount(entity1, entity2);
        const compareResult2 = service.compareEmployeeLeaveAccount(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareEmployeeLeaveAccount(entity1, entity2);
        const compareResult2 = service.compareEmployeeLeaveAccount(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareEmployeeLeaveAccount(entity1, entity2);
        const compareResult2 = service.compareEmployeeLeaveAccount(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
