import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { WorkExperienceFormService, WorkExperienceFormGroup } from './work-experience-form.service';
import { IWorkExperience } from '../work-experience.model';
import { WorkExperienceService } from '../service/work-experience.service';

@Component({
  selector: 'jhi-work-experience-update',
  templateUrl: './work-experience-update.component.html',
})
export class WorkExperienceUpdateComponent implements OnInit {
  isSaving = false;
  workExperience: IWorkExperience | null = null;

  editForm: WorkExperienceFormGroup = this.workExperienceFormService.createWorkExperienceFormGroup();

  constructor(
    protected workExperienceService: WorkExperienceService,
    protected workExperienceFormService: WorkExperienceFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ workExperience }) => {
      this.workExperience = workExperience;
      if (workExperience) {
        this.updateForm(workExperience);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const workExperience = this.workExperienceFormService.getWorkExperience(this.editForm);
    if (workExperience.id !== null) {
      this.subscribeToSaveResponse(this.workExperienceService.update(workExperience));
    } else {
      this.subscribeToSaveResponse(this.workExperienceService.create(workExperience));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IWorkExperience>>): void {
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

  protected updateForm(workExperience: IWorkExperience): void {
    this.workExperience = workExperience;
    this.workExperienceFormService.resetForm(this.editForm, workExperience);
  }
}
