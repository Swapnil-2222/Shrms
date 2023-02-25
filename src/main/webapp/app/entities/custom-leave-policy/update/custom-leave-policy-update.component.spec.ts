import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { CustomLeavePolicyFormService } from './custom-leave-policy-form.service';
import { CustomLeavePolicyService } from '../service/custom-leave-policy.service';
import { ICustomLeavePolicy } from '../custom-leave-policy.model';

import { CustomLeavePolicyUpdateComponent } from './custom-leave-policy-update.component';

describe('CustomLeavePolicy Management Update Component', () => {
  let comp: CustomLeavePolicyUpdateComponent;
  let fixture: ComponentFixture<CustomLeavePolicyUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let customLeavePolicyFormService: CustomLeavePolicyFormService;
  let customLeavePolicyService: CustomLeavePolicyService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [CustomLeavePolicyUpdateComponent],
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
      .overrideTemplate(CustomLeavePolicyUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(CustomLeavePolicyUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    customLeavePolicyFormService = TestBed.inject(CustomLeavePolicyFormService);
    customLeavePolicyService = TestBed.inject(CustomLeavePolicyService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const customLeavePolicy: ICustomLeavePolicy = { id: 456 };

      activatedRoute.data = of({ customLeavePolicy });
      comp.ngOnInit();

      expect(comp.customLeavePolicy).toEqual(customLeavePolicy);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICustomLeavePolicy>>();
      const customLeavePolicy = { id: 123 };
      jest.spyOn(customLeavePolicyFormService, 'getCustomLeavePolicy').mockReturnValue(customLeavePolicy);
      jest.spyOn(customLeavePolicyService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ customLeavePolicy });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: customLeavePolicy }));
      saveSubject.complete();

      // THEN
      expect(customLeavePolicyFormService.getCustomLeavePolicy).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(customLeavePolicyService.update).toHaveBeenCalledWith(expect.objectContaining(customLeavePolicy));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICustomLeavePolicy>>();
      const customLeavePolicy = { id: 123 };
      jest.spyOn(customLeavePolicyFormService, 'getCustomLeavePolicy').mockReturnValue({ id: null });
      jest.spyOn(customLeavePolicyService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ customLeavePolicy: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: customLeavePolicy }));
      saveSubject.complete();

      // THEN
      expect(customLeavePolicyFormService.getCustomLeavePolicy).toHaveBeenCalled();
      expect(customLeavePolicyService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICustomLeavePolicy>>();
      const customLeavePolicy = { id: 123 };
      jest.spyOn(customLeavePolicyService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ customLeavePolicy });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(customLeavePolicyService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
