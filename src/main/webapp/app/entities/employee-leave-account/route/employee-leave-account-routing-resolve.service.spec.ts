import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { IEmployeeLeaveAccount } from '../employee-leave-account.model';
import { EmployeeLeaveAccountService } from '../service/employee-leave-account.service';

import { EmployeeLeaveAccountRoutingResolveService } from './employee-leave-account-routing-resolve.service';

describe('EmployeeLeaveAccount routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: EmployeeLeaveAccountRoutingResolveService;
  let service: EmployeeLeaveAccountService;
  let resultEmployeeLeaveAccount: IEmployeeLeaveAccount | null | undefined;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({}),
            },
          },
        },
      ],
    });
    mockRouter = TestBed.inject(Router);
    jest.spyOn(mockRouter, 'navigate').mockImplementation(() => Promise.resolve(true));
    mockActivatedRouteSnapshot = TestBed.inject(ActivatedRoute).snapshot;
    routingResolveService = TestBed.inject(EmployeeLeaveAccountRoutingResolveService);
    service = TestBed.inject(EmployeeLeaveAccountService);
    resultEmployeeLeaveAccount = undefined;
  });

  describe('resolve', () => {
    it('should return IEmployeeLeaveAccount returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultEmployeeLeaveAccount = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultEmployeeLeaveAccount).toEqual({ id: 123 });
    });

    it('should return null if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultEmployeeLeaveAccount = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultEmployeeLeaveAccount).toEqual(null);
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse<IEmployeeLeaveAccount>({ body: null })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultEmployeeLeaveAccount = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultEmployeeLeaveAccount).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
