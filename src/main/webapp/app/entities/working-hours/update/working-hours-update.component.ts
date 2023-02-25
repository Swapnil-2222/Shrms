import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { WorkingHoursFormService, WorkingHoursFormGroup } from './working-hours-form.service';
import { IWorkingHours } from '../working-hours.model';
import { WorkingHoursService } from '../service/working-hours.service';

@Component({
  selector: 'jhi-working-hours-update',
  templateUrl: './working-hours-update.component.html',
})
export class WorkingHoursUpdateComponent implements OnInit {
  isSaving = false;
  workingHours: IWorkingHours | null = null;

  editForm: WorkingHoursFormGroup = this.workingHoursFormService.createWorkingHoursFormGroup();

  constructor(
    protected workingHoursService: WorkingHoursService,
    protected workingHoursFormService: WorkingHoursFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ workingHours }) => {
      this.workingHours = workingHours;
      if (workingHours) {
        this.updateForm(workingHours);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const workingHours = this.workingHoursFormService.getWorkingHours(this.editForm);
    if (workingHours.id !== null) {
      this.subscribeToSaveResponse(this.workingHoursService.update(workingHours));
    } else {
      this.subscribeToSaveResponse(this.workingHoursService.create(workingHours));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IWorkingHours>>): void {
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

  protected updateForm(workingHours: IWorkingHours): void {
    this.workingHours = workingHours;
    this.workingHoursFormService.resetForm(this.editForm, workingHours);
  }
}
