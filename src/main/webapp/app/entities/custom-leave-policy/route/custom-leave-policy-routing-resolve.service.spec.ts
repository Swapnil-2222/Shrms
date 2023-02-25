import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { ICustomLeavePolicy } from '../custom-leave-policy.model';
import { CustomLeavePolicyService } from '../service/custom-leave-policy.service';

import { CustomLeavePolicyRoutingResolveService } from './custom-leave-policy-routing-resolve.service';

describe('CustomLeavePolicy routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: CustomLeavePolicyRoutingResolveService;
  let service: CustomLeavePolicyService;
  let resultCustomLeavePolicy: ICustomLeavePolicy | null | undefined;

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
    routingResolveService = TestBed.inject(CustomLeavePolicyRoutingResolveService);
    service = TestBed.inject(CustomLeavePolicyService);
    resultCustomLeavePolicy = undefined;
  });

  describe('resolve', () => {
    it('should return ICustomLeavePolicy returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultCustomLeavePolicy = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultCustomLeavePolicy).toEqual({ id: 123 });
    });

    it('should return null if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultCustomLeavePolicy = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultCustomLeavePolicy).toEqual(null);
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse<ICustomLeavePolicy>({ body: null })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultCustomLeavePolicy = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultCustomLeavePolicy).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
