import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { EmployeeLeaveAccountFormService } from './employee-leave-account-form.service';
import { EmployeeLeaveAccountService } from '../service/employee-leave-account.service';
import { IEmployeeLeaveAccount } from '../employee-leave-account.model';

import { EmployeeLeaveAccountUpdateComponent } from './employee-leave-account-update.component';

describe('EmployeeLeaveAccount Management Update Component', () => {
  let comp: EmployeeLeaveAccountUpdateComponent;
  let fixture: ComponentFixture<EmployeeLeaveAccountUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let employeeLeaveAccountFormService: EmployeeLeaveAccountFormService;
  let employeeLeaveAccountService: EmployeeLeaveAccountService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [EmployeeLeaveAccountUpdateComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(EmployeeLeaveAccountUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(EmployeeLeaveAccountUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    employeeLeaveAccountFormService = TestBed.inject(EmployeeLeaveAccountFormService);
    employeeLeaveAccountService = TestBed.inject(EmployeeLeaveAccountService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const employeeLeaveAccount: IEmployeeLeaveAccount = { id: 456 };

      activatedRoute.data = of({ employeeLeaveAccount });
      comp.ngOnInit();

      expect(comp.employeeLeaveAccount).toEqual(employeeLeaveAccount);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IEmployeeLeaveAccount>>();
      const employeeLeaveAccount = { id: 123 };
      jest.spyOn(employeeLeaveAccountFormService, 'getEmployeeLeaveAccount').mockReturnValue(employeeLeaveAccount);
      jest.spyOn(employeeLeaveAccountService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ employeeLeaveAccount });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: employeeLeaveAccount }));
      saveSubject.complete();

      // THEN
      expect(employeeLeaveAccountFormService.getEmployeeLeaveAccount).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(employeeLeaveAccountService.update).toHaveBeenCalledWith(expect.objectContaining(employeeLeaveAccount));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IEmployeeLeaveAccount>>();
      const employeeLeaveAccount = { id: 123 };
      jest.spyOn(employeeLeaveAccountFormService, 'getEmployeeLeaveAccount').mockReturnValue({ id: null });
      jest.spyOn(employeeLeaveAccountService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ employeeLeaveAccount: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: employeeLeaveAccount }));
      saveSubject.complete();

      // THEN
      expect(employeeLeaveAccountFormService.getEmployeeLeaveAccount).toHaveBeenCalled();
      expect(employeeLeaveAccountService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IEmployeeLeaveAccount>>();
      const employeeLeaveAccount = { id: 123 };
      jest.spyOn(employeeLeaveAccountService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ employeeLeaveAccount });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(employeeLeaveAccountService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
