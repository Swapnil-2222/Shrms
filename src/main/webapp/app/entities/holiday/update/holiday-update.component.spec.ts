import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { HolidayFormService } from './holiday-form.service';
import { HolidayService } from '../service/holiday.service';
import { IHoliday } from '../holiday.model';

import { HolidayUpdateComponent } from './holiday-update.component';

describe('Holiday Management Update Component', () => {
  let comp: HolidayUpdateComponent;
  let fixture: ComponentFixture<HolidayUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let holidayFormService: HolidayFormService;
  let holidayService: HolidayService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [HolidayUpdateComponent],
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
      .overrideTemplate(HolidayUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(HolidayUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    holidayFormService = TestBed.inject(HolidayFormService);
    holidayService = TestBed.inject(HolidayService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const holiday: IHoliday = { id: 456 };

      activatedRoute.data = of({ holiday });
      comp.ngOnInit();

      expect(comp.holiday).toEqual(holiday);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IHoliday>>();
      const holiday = { id: 123 };
      jest.spyOn(holidayFormService, 'getHoliday').mockReturnValue(holiday);
      jest.spyOn(holidayService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ holiday });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: holiday }));
      saveSubject.complete();

      // THEN
      expect(holidayFormService.getHoliday).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(holidayService.update).toHaveBeenCalledWith(expect.objectContaining(holiday));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IHoliday>>();
      const holiday = { id: 123 };
      jest.spyOn(holidayFormService, 'getHoliday').mockReturnValue({ id: null });
      jest.spyOn(holidayService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ holiday: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: holiday }));
      saveSubject.complete();

      // THEN
      expect(holidayFormService.getHoliday).toHaveBeenCalled();
      expect(holidayService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IHoliday>>();
      const holiday = { id: 123 };
      jest.spyOn(holidayService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ holiday });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(holidayService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
