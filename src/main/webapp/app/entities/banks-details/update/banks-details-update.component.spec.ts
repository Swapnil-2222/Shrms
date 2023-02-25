import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { BanksDetailsFormService } from './banks-details-form.service';
import { BanksDetailsService } from '../service/banks-details.service';
import { IBanksDetails } from '../banks-details.model';

import { BanksDetailsUpdateComponent } from './banks-details-update.component';

describe('BanksDetails Management Update Component', () => {
  let comp: BanksDetailsUpdateComponent;
  let fixture: ComponentFixture<BanksDetailsUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let banksDetailsFormService: BanksDetailsFormService;
  let banksDetailsService: BanksDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [BanksDetailsUpdateComponent],
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
      .overrideTemplate(BanksDetailsUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(BanksDetailsUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    banksDetailsFormService = TestBed.inject(BanksDetailsFormService);
    banksDetailsService = TestBed.inject(BanksDetailsService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const banksDetails: IBanksDetails = { id: 456 };

      activatedRoute.data = of({ banksDetails });
      comp.ngOnInit();

      expect(comp.banksDetails).toEqual(banksDetails);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IBanksDetails>>();
      const banksDetails = { id: 123 };
      jest.spyOn(banksDetailsFormService, 'getBanksDetails').mockReturnValue(banksDetails);
      jest.spyOn(banksDetailsService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ banksDetails });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: banksDetails }));
      saveSubject.complete();

      // THEN
      expect(banksDetailsFormService.getBanksDetails).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(banksDetailsService.update).toHaveBeenCalledWith(expect.objectContaining(banksDetails));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IBanksDetails>>();
      const banksDetails = { id: 123 };
      jest.spyOn(banksDetailsFormService, 'getBanksDetails').mockReturnValue({ id: null });
      jest.spyOn(banksDetailsService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ banksDetails: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: banksDetails }));
      saveSubject.complete();

      // THEN
      expect(banksDetailsFormService.getBanksDetails).toHaveBeenCalled();
      expect(banksDetailsService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IBanksDetails>>();
      const banksDetails = { id: 123 };
      jest.spyOn(banksDetailsService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ banksDetails });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(banksDetailsService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
