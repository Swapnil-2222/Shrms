import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { WorkingHoursFormService } from './working-hours-form.service';
import { WorkingHoursService } from '../service/working-hours.service';
import { IWorkingHours } from '../working-hours.model';

import { WorkingHoursUpdateComponent } from './working-hours-update.component';

describe('WorkingHours Management Update Component', () => {
  let comp: WorkingHoursUpdateComponent;
  let fixture: ComponentFixture<WorkingHoursUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let workingHoursFormService: WorkingHoursFormService;
  let workingHoursService: WorkingHoursService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [WorkingHoursUpdateComponent],
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
      .overrideTemplate(WorkingHoursUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(WorkingHoursUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    workingHoursFormService = TestBed.inject(WorkingHoursFormService);
    workingHoursService = TestBed.inject(WorkingHoursService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const workingHours: IWorkingHours = { id: 456 };

      activatedRoute.data = of({ workingHours });
      comp.ngOnInit();

      expect(comp.workingHours).toEqual(workingHours);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IWorkingHours>>();
      const workingHours = { id: 123 };
      jest.spyOn(workingHoursFormService, 'getWorkingHours').mockReturnValue(workingHours);
      jest.spyOn(workingHoursService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ workingHours });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: workingHours }));
      saveSubject.complete();

      // THEN
      expect(workingHoursFormService.getWorkingHours).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(workingHoursService.update).toHaveBeenCalledWith(expect.objectContaining(workingHours));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IWorkingHours>>();
      const workingHours = { id: 123 };
      jest.spyOn(workingHoursFormService, 'getWorkingHours').mockReturnValue({ id: null });
      jest.spyOn(workingHoursService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ workingHours: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: workingHours }));
      saveSubject.complete();

      // THEN
      expect(workingHoursFormService.getWorkingHours).toHaveBeenCalled();
      expect(workingHoursService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IWorkingHours>>();
      const workingHours = { id: 123 };
      jest.spyOn(workingHoursService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ workingHours });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(workingHoursService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
