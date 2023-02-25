import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { ApprovalSettingFormService, ApprovalSettingFormGroup } from './approval-setting-form.service';
import { IApprovalSetting } from '../approval-setting.model';
import { ApprovalSettingService } from '../service/approval-setting.service';

@Component({
  selector: 'jhi-approval-setting-update',
  templateUrl: './approval-setting-update.component.html',
})
export class ApprovalSettingUpdateComponent implements OnInit {
  isSaving = false;
  approvalSetting: IApprovalSetting | null = null;

  editForm: ApprovalSettingFormGroup = this.approvalSettingFormService.createApprovalSettingFormGroup();

  constructor(
    protected approvalSettingService: ApprovalSettingService,
    protected approvalSettingFormService: ApprovalSettingFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ approvalSetting }) => {
      this.approvalSetting = approvalSetting;
      if (approvalSetting) {
        this.updateForm(approvalSetting);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const approvalSetting = this.approvalSettingFormService.getApprovalSetting(this.editForm);
    if (approvalSetting.id !== null) {
      this.subscribeToSaveResponse(this.approvalSettingService.update(approvalSetting));
    } else {
      this.subscribeToSaveResponse(this.approvalSettingService.create(approvalSetting));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IApprovalSetting>>): void {
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

  protected updateForm(approvalSetting: IApprovalSetting): void {
    this.approvalSetting = approvalSetting;
    this.approvalSettingFormService.resetForm(this.editForm, approvalSetting);
  }
}
