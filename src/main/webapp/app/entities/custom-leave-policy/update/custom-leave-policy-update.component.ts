import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { CustomLeavePolicyFormService, CustomLeavePolicyFormGroup } from './custom-leave-policy-form.service';
import { ICustomLeavePolicy } from '../custom-leave-policy.model';
import { CustomLeavePolicyService } from '../service/custom-leave-policy.service';

@Component({
  selector: 'jhi-custom-leave-policy-update',
  templateUrl: './custom-leave-policy-update.component.html',
})
export class CustomLeavePolicyUpdateComponent implements OnInit {
  isSaving = false;
  customLeavePolicy: ICustomLeavePolicy | null = null;

  editForm: CustomLeavePolicyFormGroup = this.customLeavePolicyFormService.createCustomLeavePolicyFormGroup();

  constructor(
    protected customLeavePolicyService: CustomLeavePolicyService,
    protected customLeavePolicyFormService: CustomLeavePolicyFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ customLeavePolicy }) => {
      this.customLeavePolicy = customLeavePolicy;
      if (customLeavePolicy) {
        this.updateForm(customLeavePolicy);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const customLeavePolicy = this.customLeavePolicyFormService.getCustomLeavePolicy(this.editForm);
    if (customLeavePolicy.id !== null) {
      this.subscribeToSaveResponse(this.customLeavePolicyService.update(customLeavePolicy));
    } else {
      this.subscribeToSaveResponse(this.customLeavePolicyService.create(customLeavePolicy));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICustomLeavePolicy>>): void {
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

  protected updateForm(customLeavePolicy: ICustomLeavePolicy): void {
    this.customLeavePolicy = customLeavePolicy;
    this.customLeavePolicyFormService.resetForm(this.editForm, customLeavePolicy);
  }
}
