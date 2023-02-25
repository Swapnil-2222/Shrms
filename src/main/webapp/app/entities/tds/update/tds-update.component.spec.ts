import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { TdsFormService } from './tds-form.service';
import { TdsService } from '../service/tds.service';
import { ITds } from '../tds.model';

import { TdsUpdateComponent } from './tds-update.component';

describe('Tds Management Update Component', () => {
  let comp: TdsUpdateComponent;
  let fixture: ComponentFixture<TdsUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let tdsFormService: TdsFormService;
  let tdsService: TdsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [TdsUpdateComponent],
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
      .overrideTemplate(TdsUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(TdsUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    tdsFormService = TestBed.inject(TdsFormService);
    tdsService = TestBed.inject(TdsService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const tds: ITds = { id: 456 };

      activatedRoute.data = of({ tds });
      comp.ngOnInit();

      expect(comp.tds).toEqual(tds);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITds>>();
      const tds = { id: 123 };
      jest.spyOn(tdsFormService, 'getTds').mockReturnValue(tds);
      jest.spyOn(tdsService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ tds });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: tds }));
      saveSubject.complete();

      // THEN
      expect(tdsFormService.getTds).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(tdsService.update).toHaveBeenCalledWith(expect.objectContaining(tds));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITds>>();
      const tds = { id: 123 };
      jest.spyOn(tdsFormService, 'getTds').mockReturnValue({ id: null });
      jest.spyOn(tdsService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ tds: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: tds }));
      saveSubject.complete();

      // THEN
      expect(tdsFormService.getTds).toHaveBeenCalled();
      expect(tdsService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITds>>();
      const tds = { id: 123 };
      jest.spyOn(tdsService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ tds });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(tdsService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
