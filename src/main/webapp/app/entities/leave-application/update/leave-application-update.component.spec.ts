import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { LeaveApplicationFormService } from './leave-application-form.service';
import { LeaveApplicationService } from '../service/leave-application.service';
import { ILeaveApplication } from '../leave-application.model';

import { LeaveApplicationUpdateComponent } from './leave-application-update.component';

describe('LeaveApplication Management Update Component', () => {
  let comp: LeaveApplicationUpdateComponent;
  let fixture: ComponentFixture<LeaveApplicationUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let leaveApplicationFormService: LeaveApplicationFormService;
  let leaveApplicationService: LeaveApplicationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [LeaveApplicationUpdateComponent],
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
      .overrideTemplate(LeaveApplicationUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(LeaveApplicationUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    leaveApplicationFormService = TestBed.inject(LeaveApplicationFormService);
    leaveApplicationService = TestBed.inject(LeaveApplicationService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const leaveApplication: ILeaveApplication = { id: 456 };

      activatedRoute.data = of({ leaveApplication });
      comp.ngOnInit();

      expect(comp.leaveApplication).toEqual(leaveApplication);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ILeaveApplication>>();
      const leaveApplication = { id: 123 };
      jest.spyOn(leaveApplicationFormService, 'getLeaveApplication').mockReturnValue(leaveApplication);
      jest.spyOn(leaveApplicationService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ leaveApplication });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: leaveApplication }));
      saveSubject.complete();

      // THEN
      expect(leaveApplicationFormService.getLeaveApplication).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(leaveApplicationService.update).toHaveBeenCalledWith(expect.objectContaining(leaveApplication));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ILeaveApplication>>();
      const leaveApplication = { id: 123 };
      jest.spyOn(leaveApplicationFormService, 'getLeaveApplication').mockReturnValue({ id: null });
      jest.spyOn(leaveApplicationService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ leaveApplication: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: leaveApplication }));
      saveSubject.complete();

      // THEN
      expect(leaveApplicationFormService.getLeaveApplication).toHaveBeenCalled();
      expect(leaveApplicationService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ILeaveApplication>>();
      const leaveApplication = { id: 123 };
      jest.spyOn(leaveApplicationService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ leaveApplication });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(leaveApplicationService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
