import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { EmploymentTypeFormService } from './employment-type-form.service';
import { EmploymentTypeService } from '../service/employment-type.service';
import { IEmploymentType } from '../employment-type.model';

import { EmploymentTypeUpdateComponent } from './employment-type-update.component';

describe('EmploymentType Management Update Component', () => {
  let comp: EmploymentTypeUpdateComponent;
  let fixture: ComponentFixture<EmploymentTypeUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let employmentTypeFormService: EmploymentTypeFormService;
  let employmentTypeService: EmploymentTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [EmploymentTypeUpdateComponent],
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
      .overrideTemplate(EmploymentTypeUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(EmploymentTypeUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    employmentTypeFormService = TestBed.inject(EmploymentTypeFormService);
    employmentTypeService = TestBed.inject(EmploymentTypeService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const employmentType: IEmploymentType = { id: 456 };

      activatedRoute.data = of({ employmentType });
      comp.ngOnInit();

      expect(comp.employmentType).toEqual(employmentType);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IEmploymentType>>();
      const employmentType = { id: 123 };
      jest.spyOn(employmentTypeFormService, 'getEmploymentType').mockReturnValue(employmentType);
      jest.spyOn(employmentTypeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ employmentType });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: employmentType }));
      saveSubject.complete();

      // THEN
      expect(employmentTypeFormService.getEmploymentType).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(employmentTypeService.update).toHaveBeenCalledWith(expect.objectContaining(employmentType));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IEmploymentType>>();
      const employmentType = { id: 123 };
      jest.spyOn(employmentTypeFormService, 'getEmploymentType').mockReturnValue({ id: null });
      jest.spyOn(employmentTypeService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ employmentType: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: employmentType }));
      saveSubject.complete();

      // THEN
      expect(employmentTypeFormService.getEmploymentType).toHaveBeenCalled();
      expect(employmentTypeService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IEmploymentType>>();
      const employmentType = { id: 123 };
      jest.spyOn(employmentTypeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ employmentType });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(employmentTypeService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
