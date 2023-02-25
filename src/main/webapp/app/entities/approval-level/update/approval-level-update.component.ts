import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { ApprovalLevelFormService, ApprovalLevelFormGroup } from './approval-level-form.service';
import { IApprovalLevel } from '../approval-level.model';
import { ApprovalLevelService } from '../service/approval-level.service';

@Component({
  selector: 'jhi-approval-level-update',
  templateUrl: './approval-level-update.component.html',
})
export class ApprovalLevelUpdateComponent implements OnInit {
  isSaving = false;
  approvalLevel: IApprovalLevel | null = null;

  editForm: ApprovalLevelFormGroup = this.approvalLevelFormService.createApprovalLevelFormGroup();

  constructor(
    protected approvalLevelService: ApprovalLevelService,
    protected approvalLevelFormService: ApprovalLevelFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ approvalLevel }) => {
      this.approvalLevel = approvalLevel;
      if (approvalLevel) {
        this.updateForm(approvalLevel);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const approvalLevel = this.approvalLevelFormService.getApprovalLevel(this.editForm);
    if (approvalLevel.id !== null) {
      this.subscribeToSaveResponse(this.approvalLevelService.update(approvalLevel));
    } else {
      this.subscribeToSaveResponse(this.approvalLevelService.create(approvalLevel));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IApprovalLevel>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(approvalLevel: IApprovalLevel): void {
    this.approvalLevel = approvalLevel;
    this.approvalLevelFormService.resetForm(this.editForm, approvalLevel);
  }
}
