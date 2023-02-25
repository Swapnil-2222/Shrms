import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { ApprovalLevelFormService } from './approval-level-form.service';
import { ApprovalLevelService } from '../service/approval-level.service';
import { IApprovalLevel } from '../approval-level.model';

import { ApprovalLevelUpdateComponent } from './approval-level-update.component';

describe('ApprovalLevel Management Update Component', () => {
  let comp: ApprovalLevelUpdateComponent;
  let fixture: ComponentFixture<ApprovalLevelUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let approvalLevelFormService: ApprovalLevelFormService;
  let approvalLevelService: ApprovalLevelService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [ApprovalLevelUpdateComponent],
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
      .overrideTemplate(ApprovalLevelUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ApprovalLevelUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    approvalLevelFormService = TestBed.inject(ApprovalLevelFormService);
    approvalLevelService = TestBed.inject(ApprovalLevelService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const approvalLevel: IApprovalLevel = { id: 456 };

      activatedRoute.data = of({ approvalLevel });
      comp.ngOnInit();

      expect(comp.approvalLevel).toEqual(approvalLevel);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IApprovalLevel>>();
      const approvalLevel = { id: 123 };
      jest.spyOn(approvalLevelFormService, 'getApprovalLevel').mockReturnValue(approvalLevel);
      jest.spyOn(approvalLevelService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ approvalLevel });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: approvalLevel }));
      saveSubject.complete();

      // THEN
      expect(approvalLevelFormService.getApprovalLevel).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(approvalLevelService.update).toHaveBeenCalledWith(expect.objectContaining(approvalLevel));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IApprovalLevel>>();
      const approvalLevel = { id: 123 };
      jest.spyOn(approvalLevelFormService, 'getApprovalLevel').mockReturnValue({ id: null });
      jest.spyOn(approvalLevelService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ approvalLevel: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: approvalLevel }));
      saveSubject.complete();

      // THEN
      expect(approvalLevelFormService.getApprovalLevel).toHaveBeenCalled();
      expect(approvalLevelService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IApprovalLevel>>();
      const approvalLevel = { id: 123 };
      jest.spyOn(approvalLevelService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ approvalLevel });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(approvalLevelService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
