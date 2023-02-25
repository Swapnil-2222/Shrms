import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { WorkDaysSettingFormService } from './work-days-setting-form.service';
import { WorkDaysSettingService } from '../service/work-days-setting.service';
import { IWorkDaysSetting } from '../work-days-setting.model';

import { WorkDaysSettingUpdateComponent } from './work-days-setting-update.component';

describe('WorkDaysSetting Management Update Component', () => {
  let comp: WorkDaysSettingUpdateComponent;
  let fixture: ComponentFixture<WorkDaysSettingUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let workDaysSettingFormService: WorkDaysSettingFormService;
  let workDaysSettingService: WorkDaysSettingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [WorkDaysSettingUpdateComponent],
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
      .overrideTemplate(WorkDaysSettingUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(WorkDaysSettingUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    workDaysSettingFormService = TestBed.inject(WorkDaysSettingFormService);
    workDaysSettingService = TestBed.inject(WorkDaysSettingService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const workDaysSetting: IWorkDaysSetting = { id: 456 };

      activatedRoute.data = of({ workDaysSetting });
      comp.ngOnInit();

      expect(comp.workDaysSetting).toEqual(workDaysSetting);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IWorkDaysSetting>>();
      const workDaysSetting = { id: 123 };
      jest.spyOn(workDaysSettingFormService, 'getWorkDaysSetting').mockReturnValue(workDaysSetting);
      jest.spyOn(workDaysSettingService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ workDaysSetting });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: workDaysSetting }));
      saveSubject.complete();

      // THEN
      expect(workDaysSettingFormService.getWorkDaysSetting).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(workDaysSettingService.update).toHaveBeenCalledWith(expect.objectContaining(workDaysSetting));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IWorkDaysSetting>>();
      const workDaysSetting = { id: 123 };
      jest.spyOn(workDaysSettingFormService, 'getWorkDaysSetting').mockReturnValue({ id: null });
      jest.spyOn(workDaysSettingService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ workDaysSetting: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: workDaysSetting }));
      saveSubject.complete();

      // THEN
      expect(workDaysSettingFormService.getWorkDaysSetting).toHaveBeenCalled();
      expect(workDaysSettingService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IWorkDaysSetting>>();
      const workDaysSetting = { id: 123 };
      jest.spyOn(workDaysSettingService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ workDaysSetting });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(workDaysSettingService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
