import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { EmployeeLeaveAccountFormService, EmployeeLeaveAccountFormGroup } from './employee-leave-account-form.service';
import { IEmployeeLeaveAccount } from '../employee-leave-account.model';
import { EmployeeLeaveAccountService } from '../service/employee-leave-account.service';

@Component({
  selector: 'jhi-employee-leave-account-update',
  templateUrl: './employee-leave-account-update.component.html',
})
export class EmployeeLeaveAccountUpdateComponent implements OnInit {
  isSaving = false;
  employeeLeaveAccount: IEmployeeLeaveAccount | null = null;

  editForm: EmployeeLeaveAccountFormGroup = this.employeeLeaveAccountFormService.createEmployeeLeaveAccountFormGroup();

  constructor(
    protected employeeLeaveAccountService: EmployeeLeaveAccountService,
    protected employeeLeaveAccountFormService: EmployeeLeaveAccountFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ employeeLeaveAccount }) => {
      this.employeeLeaveAccount = employeeLeaveAccount;
      if (employeeLeaveAccount) {
        this.updateForm(employeeLeaveAccount);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const employeeLeaveAccount = this.employeeLeaveAccountFormService.getEmployeeLeaveAccount(this.editForm);
    if (employeeLeaveAccount.id !== null) {
      this.subscribeToSaveResponse(this.employeeLeaveAccountService.update(employeeLeaveAccount));
    } else {
      this.subscribeToSaveResponse(this.employeeLeaveAccountService.create(employeeLeaveAccount));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEmployeeLeaveAccount>>): void {
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

  protected updateForm(employeeLeaveAccount: IEmployeeLeaveAccount): void {
    this.employeeLeaveAccount = employeeLeaveAccount;
    this.employeeLeaveAccountFormService.resetForm(this.editForm, employeeLeaveAccount);
  }
}
