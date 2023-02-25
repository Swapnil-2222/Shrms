import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { RemunerationFormService } from './remuneration-form.service';
import { RemunerationService } from '../service/remuneration.service';
import { IRemuneration } from '../remuneration.model';

import { RemunerationUpdateComponent } from './remuneration-update.component';

describe('Remuneration Management Update Component', () => {
  let comp: RemunerationUpdateComponent;
  let fixture: ComponentFixture<RemunerationUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let remunerationFormService: RemunerationFormService;
  let remunerationService: RemunerationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [RemunerationUpdateComponent],
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
      .overrideTemplate(RemunerationUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(RemunerationUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    remunerationFormService = TestBed.inject(RemunerationFormService);
    remunerationService = TestBed.inject(RemunerationService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const remuneration: IRemuneration = { id: 456 };

      activatedRoute.data = of({ remuneration });
      comp.ngOnInit();

      expect(comp.remuneration).toEqual(remuneration);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IRemuneration>>();
      const remuneration = { id: 123 };
      jest.spyOn(remunerationFormService, 'getRemuneration').mockReturnValue(remuneration);
      jest.spyOn(remunerationService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ remuneration });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: remuneration }));
      saveSubject.complete();

      // THEN
      expect(remunerationFormService.getRemuneration).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(remunerationService.update).toHaveBeenCalledWith(expect.objectContaining(remuneration));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IRemuneration>>();
      const remuneration = { id: 123 };
      jest.spyOn(remunerationFormService, 'getRemuneration').mockReturnValue({ id: null });
      jest.spyOn(remunerationService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ remuneration: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: remuneration }));
      saveSubject.complete();

      // THEN
      expect(remunerationFormService.getRemuneration).toHaveBeenCalled();
      expect(remunerationService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IRemuneration>>();
      const remuneration = { id: 123 };
      jest.spyOn(remunerationService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ remuneration });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(remunerationService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
