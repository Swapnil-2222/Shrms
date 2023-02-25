import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { HolidayFormService, HolidayFormGroup } from './holiday-form.service';
import { IHoliday } from '../holiday.model';
import { HolidayService } from '../service/holiday.service';

@Component({
  selector: 'jhi-holiday-update',
  templateUrl: './holiday-update.component.html',
})
export class HolidayUpdateComponent implements OnInit {
  isSaving = false;
  holiday: IHoliday | null = null;

  editForm: HolidayFormGroup = this.holidayFormService.createHolidayFormGroup();

  constructor(
    protected holidayService: HolidayService,
    protected holidayFormService: HolidayFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ holiday }) => {
      this.holiday = holiday;
      if (holiday) {
        this.updateForm(holiday);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const holiday = this.holidayFormService.getHoliday(this.editForm);
    if (holiday.id !== null) {
      this.subscribeToSaveResponse(this.holidayService.update(holiday));
    } else {
      this.subscribeToSaveResponse(this.holidayService.create(holiday));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IHoliday>>): void {
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

  protected updateForm(holiday: IHoliday): void {
    this.holiday = holiday;
    this.holidayFormService.resetForm(this.editForm, holiday);
  }
}
