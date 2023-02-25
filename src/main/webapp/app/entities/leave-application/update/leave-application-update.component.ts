import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { LeaveApplicationFormService, LeaveApplicationFormGroup } from './leave-application-form.service';
import { ILeaveApplication } from '../leave-application.model';
import { LeaveApplicationService } from '../service/leave-application.service';

@Component({
  selector: 'jhi-leave-application-update',
  templateUrl: './leave-application-update.component.html',
})
export class LeaveApplicationUpdateComponent implements OnInit {
  isSaving = false;
  leaveApplication: ILeaveApplication | null = null;

  editForm: LeaveApplicationFormGroup = this.leaveApplicationFormService.createLeaveApplicationFormGroup();

  constructor(
    protected leaveApplicationService: LeaveApplicationService,
    protected leaveApplicationFormService: LeaveApplicationFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ leaveApplication }) => {
      this.leaveApplication = leaveApplication;
      if (leaveApplication) {
        this.updateForm(leaveApplication);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const leaveApplication = this.leaveApplicationFormService.getLeaveApplication(this.editForm);
    if (leaveApplication.id !== null) {
      this.subscribeToSaveResponse(this.leaveApplicationService.update(leaveApplication));
    } else {
      this.subscribeToSaveResponse(this.leaveApplicationService.create(leaveApplication));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ILeaveApplication>>): void {
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

  protected updateForm(leaveApplication: ILeaveApplication): void {
    this.leaveApplication = leaveApplication;
    this.leaveApplicationFormService.resetForm(this.editForm, leaveApplication);
  }
}
