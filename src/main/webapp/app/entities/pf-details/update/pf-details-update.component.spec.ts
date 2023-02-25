import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { PfDetailsFormService } from './pf-details-form.service';
import { PfDetailsService } from '../service/pf-details.service';
import { IPfDetails } from '../pf-details.model';

import { PfDetailsUpdateComponent } from './pf-details-update.component';

describe('PfDetails Management Update Component', () => {
  let comp: PfDetailsUpdateComponent;
  let fixture: ComponentFixture<PfDetailsUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let pfDetailsFormService: PfDetailsFormService;
  let pfDetailsService: PfDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [PfDetailsUpdateComponent],
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
      .overrideTemplate(PfDetailsUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(PfDetailsUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    pfDetailsFormService = TestBed.inject(PfDetailsFormService);
    pfDetailsService = TestBed.inject(PfDetailsService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const pfDetails: IPfDetails = { id: 456 };

      activatedRoute.data = of({ pfDetails });
      comp.ngOnInit();

      expect(comp.pfDetails).toEqual(pfDetails);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IPfDetails>>();
      const pfDetails = { id: 123 };
      jest.spyOn(pfDetailsFormService, 'getPfDetails').mockReturnValue(pfDetails);
      jest.spyOn(pfDetailsService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ pfDetails });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: pfDetails }));
      saveSubject.complete();

      // THEN
      expect(pfDetailsFormService.getPfDetails).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(pfDetailsService.update).toHaveBeenCalledWith(expect.objectContaining(pfDetails));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IPfDetails>>();
      const pfDetails = { id: 123 };
      jest.spyOn(pfDetailsFormService, 'getPfDetails').mockReturnValue({ id: null });
      jest.spyOn(pfDetailsService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ pfDetails: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: pfDetails }));
      saveSubject.complete();

      // THEN
      expect(pfDetailsFormService.getPfDetails).toHaveBeenCalled();
      expect(pfDetailsService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IPfDetails>>();
      const pfDetails = { id: 123 };
      jest.spyOn(pfDetailsService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ pfDetails });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(pfDetailsService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
