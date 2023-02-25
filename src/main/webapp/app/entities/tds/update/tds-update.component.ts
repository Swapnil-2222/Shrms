import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { TdsFormService, TdsFormGroup } from './tds-form.service';
import { ITds } from '../tds.model';
import { TdsService } from '../service/tds.service';

@Component({
  selector: 'jhi-tds-update',
  templateUrl: './tds-update.component.html',
})
export class TdsUpdateComponent implements OnInit {
  isSaving = false;
  tds: ITds | null = null;

  editForm: TdsFormGroup = this.tdsFormService.createTdsFormGroup();

  constructor(protected tdsService: TdsService, protected tdsFormService: TdsFormService, protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ tds }) => {
      this.tds = tds;
      if (tds) {
        this.updateForm(tds);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const tds = this.tdsFormService.getTds(this.editForm);
    if (tds.id !== null) {
      this.subscribeToSaveResponse(this.tdsService.update(tds));
    } else {
      this.subscribeToSaveResponse(this.tdsService.create(tds));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITds>>): void {
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

  protected updateForm(tds: ITds): void {
    this.tds = tds;
    this.tdsFormService.resetForm(this.editForm, tds);
  }
}
