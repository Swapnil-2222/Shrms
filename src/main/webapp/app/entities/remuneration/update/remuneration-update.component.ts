import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { RemunerationFormService, RemunerationFormGroup } from './remuneration-form.service';
import { IRemuneration } from '../remuneration.model';
import { RemunerationService } from '../service/remuneration.service';

@Component({
  selector: 'jhi-remuneration-update',
  templateUrl: './remuneration-update.component.html',
})
export class RemunerationUpdateComponent implements OnInit {
  isSaving = false;
  remuneration: IRemuneration | null = null;

  editForm: RemunerationFormGroup = this.remunerationFormService.createRemunerationFormGroup();

  constructor(
    protected remunerationService: RemunerationService,
    protected remunerationFormService: RemunerationFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ remuneration }) => {
      this.remuneration = remuneration;
      if (remuneration) {
        this.updateForm(remuneration);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const remuneration = this.remunerationFormService.getRemuneration(this.editForm);
    if (remuneration.id !== null) {
      this.subscribeToSaveResponse(this.remunerationService.update(remuneration));
    } else {
      this.subscribeToSaveResponse(this.remunerationService.create(remuneration));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IRemuneration>>): void {
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

  protected updateForm(remuneration: IRemuneration): void {
    this.remuneration = remuneration;
    this.remunerationFormService.resetForm(this.editForm, remuneration);
  }
}
