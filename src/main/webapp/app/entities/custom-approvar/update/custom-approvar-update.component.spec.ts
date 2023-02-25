import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { CustomApprovarFormService } from './custom-approvar-form.service';
import { CustomApprovarService } from '../service/custom-approvar.service';
import { ICustomApprovar } from '../custom-approvar.model';

import { CustomApprovarUpdateComponent } from './custom-approvar-update.component';

describe('CustomApprovar Management Update Component', () => {
  let comp: CustomApprovarUpdateComponent;
  let fixture: ComponentFixture<CustomApprovarUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let customApprovarFormService: CustomApprovarFormService;
  let customApprovarService: CustomApprovarService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [CustomApprovarUpdateComponent],
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
      .overrideTemplate(CustomApprovarUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(CustomApprovarUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    customApprovarFormService = TestBed.inject(CustomApprovarFormService);
    customApprovarService = TestBed.inject(CustomApprovarService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const customApprovar: ICustomApprovar = { id: 456 };

      activatedRoute.data = of({ customApprovar });
      comp.ngOnInit();

      expect(comp.customApprovar).toEqual(customApprovar);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICustomApprovar>>();
      const customApprovar = { id: 123 };
      jest.spyOn(customApprovarFormService, 'getCustomApprovar').mockReturnValue(customApprovar);
      jest.spyOn(customApprovarService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ customApprovar });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: customApprovar }));
      saveSubject.complete();

      // THEN
      expect(customApprovarFormService.getCustomApprovar).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(customApprovarService.update).toHaveBeenCalledWith(expect.objectContaining(customApprovar));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICustomApprovar>>();
      const customApprovar = { id: 123 };
      jest.spyOn(customApprovarFormService, 'getCustomApprovar').mockReturnValue({ id: null });
      jest.spyOn(customApprovarService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ customApprovar: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: customApprovar }));
      saveSubject.complete();

      // THEN
      expect(customApprovarFormService.getCustomApprovar).toHaveBeenCalled();
      expect(customApprovarService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICustomApprovar>>();
      const customApprovar = { id: 123 };
      jest.spyOn(customApprovarService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ customApprovar });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(customApprovarService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
