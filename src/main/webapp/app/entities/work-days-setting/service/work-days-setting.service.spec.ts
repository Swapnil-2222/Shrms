import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IWorkDaysSetting } from '../work-days-setting.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../work-days-setting.test-samples';

import { WorkDaysSettingService, RestWorkDaysSetting } from './work-days-setting.service';

const requireRestSample: RestWorkDaysSetting = {
  ...sampleWithRequiredData,
  lastModified: sampleWithRequiredData.lastModified?.toJSON(),
};

describe('WorkDaysSetting Service', () => {
  let service: WorkDaysSettingService;
  let httpMock: HttpTestingController;
  let expectedResult: IWorkDaysSetting | IWorkDaysSetting[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(WorkDaysSettingService);
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

    it('should create a WorkDaysSetting', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const workDaysSetting = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(workDaysSetting).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a WorkDaysSetting', () => {
      const workDaysSetting = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(workDaysSetting).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a WorkDaysSetting', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of WorkDaysSetting', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a WorkDaysSetting', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addWorkDaysSettingToCollectionIfMissing', () => {
      it('should add a WorkDaysSetting to an empty array', () => {
        const workDaysSetting: IWorkDaysSetting = sampleWithRequiredData;
        expectedResult = service.addWorkDaysSettingToCollectionIfMissing([], workDaysSetting);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(workDaysSetting);
      });

      it('should not add a WorkDaysSetting to an array that contains it', () => {
        const workDaysSetting: IWorkDaysSetting = sampleWithRequiredData;
        const workDaysSettingCollection: IWorkDaysSetting[] = [
          {
            ...workDaysSetting,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addWorkDaysSettingToCollectionIfMissing(workDaysSettingCollection, workDaysSetting);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a WorkDaysSetting to an array that doesn't contain it", () => {
        const workDaysSetting: IWorkDaysSetting = sampleWithRequiredData;
        const workDaysSettingCollection: IWorkDaysSetting[] = [sampleWithPartialData];
        expectedResult = service.addWorkDaysSettingToCollectionIfMissing(workDaysSettingCollection, workDaysSetting);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(workDaysSetting);
      });

      it('should add only unique WorkDaysSetting to an array', () => {
        const workDaysSettingArray: IWorkDaysSetting[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const workDaysSettingCollection: IWorkDaysSetting[] = [sampleWithRequiredData];
        expectedResult = service.addWorkDaysSettingToCollectionIfMissing(workDaysSettingCollection, ...workDaysSettingArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const workDaysSetting: IWorkDaysSetting = sampleWithRequiredData;
        const workDaysSetting2: IWorkDaysSetting = sampleWithPartialData;
        expectedResult = service.addWorkDaysSettingToCollectionIfMissing([], workDaysSetting, workDaysSetting2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(workDaysSetting);
        expect(expectedResult).toContain(workDaysSetting2);
      });

      it('should accept null and undefined values', () => {
        const workDaysSetting: IWorkDaysSetting = sampleWithRequiredData;
        expectedResult = service.addWorkDaysSettingToCollectionIfMissing([], null, workDaysSetting, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(workDaysSetting);
      });

      it('should return initial array if no WorkDaysSetting is added', () => {
        const workDaysSettingCollection: IWorkDaysSetting[] = [sampleWithRequiredData];
        expectedResult = service.addWorkDaysSettingToCollectionIfMissing(workDaysSettingCollection, undefined, null);
        expect(expectedResult).toEqual(workDaysSettingCollection);
      });
    });

    describe('compareWorkDaysSetting', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareWorkDaysSetting(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareWorkDaysSetting(entity1, entity2);
        const compareResult2 = service.compareWorkDaysSetting(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareWorkDaysSetting(entity1, entity2);
        const compareResult2 = service.compareWorkDaysSetting(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareWorkDaysSetting(entity1, entity2);
        const compareResult2 = service.compareWorkDaysSetting(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
