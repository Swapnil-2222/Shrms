import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { WorkDaysSettingFormService, WorkDaysSettingFormGroup } from './work-days-setting-form.service';
import { IWorkDaysSetting } from '../work-days-setting.model';
import { WorkDaysSettingService } from '../service/work-days-setting.service';

@Component({
  selector: 'jhi-work-days-setting-update',
  templateUrl: './work-days-setting-update.component.html',
})
export class WorkDaysSettingUpdateComponent implements OnInit {
  isSaving = false;
  workDaysSetting: IWorkDaysSetting | null = null;

  editForm: WorkDaysSettingFormGroup = this.workDaysSettingFormService.createWorkDaysSettingFormGroup();

  constructor(
    protected workDaysSettingService: WorkDaysSettingService,
    protected workDaysSettingFormService: WorkDaysSettingFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ workDaysSetting }) => {
      this.workDaysSetting = workDaysSetting;
      if (workDaysSetting) {
        this.updateForm(workDaysSetting);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const workDaysSetting = this.workDaysSettingFormService.getWorkDaysSetting(this.editForm);
    if (workDaysSetting.id !== null) {
      this.subscribeToSaveResponse(this.workDaysSettingService.update(workDaysSetting));
    } else {
      this.subscribeToSaveResponse(this.workDaysSettingService.create(workDaysSetting));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IWorkDaysSetting>>): void {
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

  protected updateForm(workDaysSetting: IWorkDaysSetting): void {
    this.workDaysSetting = workDaysSetting;
    this.workDaysSettingFormService.resetForm(this.editForm, workDaysSetting);
  }
}
