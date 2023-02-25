import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { EsiDetailsFormService } from './esi-details-form.service';
import { EsiDetailsService } from '../service/esi-details.service';
import { IEsiDetails } from '../esi-details.model';

import { EsiDetailsUpdateComponent } from './esi-details-update.component';

describe('EsiDetails Management Update Component', () => {
  let comp: EsiDetailsUpdateComponent;
  let fixture: ComponentFixture<EsiDetailsUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let esiDetailsFormService: EsiDetailsFormService;
  let esiDetailsService: EsiDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [EsiDetailsUpdateComponent],
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
      .overrideTemplate(EsiDetailsUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(EsiDetailsUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    esiDetailsFormService = TestBed.inject(EsiDetailsFormService);
    esiDetailsService = TestBed.inject(EsiDetailsService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const esiDetails: IEsiDetails = { id: 456 };

      activatedRoute.data = of({ esiDetails });
      comp.ngOnInit();

      expect(comp.esiDetails).toEqual(esiDetails);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IEsiDetails>>();
      const esiDetails = { id: 123 };
      jest.spyOn(esiDetailsFormService, 'getEsiDetails').mockReturnValue(esiDetails);
      jest.spyOn(esiDetailsService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ esiDetails });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: esiDetails }));
      saveSubject.complete();

      // THEN
      expect(esiDetailsFormService.getEsiDetails).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(esiDetailsService.update).toHaveBeenCalledWith(expect.objectContaining(esiDetails));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IEsiDetails>>();
      const esiDetails = { id: 123 };
      jest.spyOn(esiDetailsFormService, 'getEsiDetails').mockReturnValue({ id: null });
      jest.spyOn(esiDetailsService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ esiDetails: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: esiDetails }));
      saveSubject.complete();

      // THEN
      expect(esiDetailsFormService.getEsiDetails).toHaveBeenCalled();
      expect(esiDetailsService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IEsiDetails>>();
      const esiDetails = { id: 123 };
      jest.spyOn(esiDetailsService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ esiDetails });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(esiDetailsService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
