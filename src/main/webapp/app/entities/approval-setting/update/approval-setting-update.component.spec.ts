import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { ApprovalSettingFormService } from './approval-setting-form.service';
import { ApprovalSettingService } from '../service/approval-setting.service';
import { IApprovalSetting } from '../approval-setting.model';

import { ApprovalSettingUpdateComponent } from './approval-setting-update.component';

describe('ApprovalSetting Management Update Component', () => {
  let comp: ApprovalSettingUpdateComponent;
  let fixture: ComponentFixture<ApprovalSettingUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let approvalSettingFormService: ApprovalSettingFormService;
  let approvalSettingService: ApprovalSettingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [ApprovalSettingUpdateComponent],
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
      .overrideTemplate(ApprovalSettingUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ApprovalSettingUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    approvalSettingFormService = TestBed.inject(ApprovalSettingFormService);
    approvalSettingService = TestBed.inject(ApprovalSettingService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const approvalSetting: IApprovalSetting = { id: 456 };

      activatedRoute.data = of({ approvalSetting });
      comp.ngOnInit();

      expect(comp.approvalSetting).toEqual(approvalSetting);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IApprovalSetting>>();
      const approvalSetting = { id: 123 };
      jest.spyOn(approvalSettingFormService, 'getApprovalSetting').mockReturnValue(approvalSetting);
      jest.spyOn(approvalSettingService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ approvalSetting });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: approvalSetting }));
      saveSubject.complete();

      // THEN
      expect(approvalSettingFormService.getApprovalSetting).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(approvalSettingService.update).toHaveBeenCalledWith(expect.objectContaining(approvalSetting));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IApprovalSetting>>();
      const approvalSetting = { id: 123 };
      jest.spyOn(approvalSettingFormService, 'getApprovalSetting').mockReturnValue({ id: null });
      jest.spyOn(approvalSettingService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ approvalSetting: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: approvalSetting }));
      saveSubject.complete();

      // THEN
      expect(approvalSettingFormService.getApprovalSetting).toHaveBeenCalled();
      expect(approvalSettingService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IApprovalSetting>>();
      const approvalSetting = { id: 123 };
      jest.spyOn(approvalSettingService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ approvalSetting });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(approvalSettingService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
