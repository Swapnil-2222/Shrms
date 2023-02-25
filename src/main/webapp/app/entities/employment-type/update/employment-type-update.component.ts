import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { EmploymentTypeFormService, EmploymentTypeFormGroup } from './employment-type-form.service';
import { IEmploymentType } from '../employment-type.model';
import { EmploymentTypeService } from '../service/employment-type.service';

@Component({
  selector: 'jhi-employment-type-update',
  templateUrl: './employment-type-update.component.html',
})
export class EmploymentTypeUpdateComponent implements OnInit {
  isSaving = false;
  employmentType: IEmploymentType | null = null;

  editForm: EmploymentTypeFormGroup = this.employmentTypeFormService.createEmploymentTypeFormGroup();

  constructor(
    protected employmentTypeService: EmploymentTypeService,
    protected employmentTypeFormService: EmploymentTypeFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ employmentType }) => {
      this.employmentType = employmentType;
      if (employmentType) {
        this.updateForm(employmentType);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const employmentType = this.employmentTypeFormService.getEmploymentType(this.editForm);
    if (employmentType.id !== null) {
      this.subscribeToSaveResponse(this.employmentTypeService.update(employmentType));
    } else {
      this.subscribeToSaveResponse(this.employmentTypeService.create(employmentType));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEmploymentType>>): void {
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

  protected updateForm(employmentType: IEmploymentType): void {
    this.employmentType = employmentType;
    this.employmentTypeFormService.resetForm(this.editForm, employmentType);
  }
}
