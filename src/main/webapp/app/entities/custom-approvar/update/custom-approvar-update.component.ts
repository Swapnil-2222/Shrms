import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { CustomApprovarFormService, CustomApprovarFormGroup } from './custom-approvar-form.service';
import { ICustomApprovar } from '../custom-approvar.model';
import { CustomApprovarService } from '../service/custom-approvar.service';

@Component({
  selector: 'jhi-custom-approvar-update',
  templateUrl: './custom-approvar-update.component.html',
})
export class CustomApprovarUpdateComponent implements OnInit {
  isSaving = false;
  customApprovar: ICustomApprovar | null = null;

  editForm: CustomApprovarFormGroup = this.customApprovarFormService.createCustomApprovarFormGroup();

  constructor(
    protected customApprovarService: CustomApprovarService,
    protected customApprovarFormService: CustomApprovarFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ customApprovar }) => {
      this.customApprovar = customApprovar;
      if (customApprovar) {
        this.updateForm(customApprovar);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const customApprovar = this.customApprovarFormService.getCustomApprovar(this.editForm);
    if (customApprovar.id !== null) {
      this.subscribeToSaveResponse(this.customApprovarService.update(customApprovar));
    } else {
      this.subscribeToSaveResponse(this.customApprovarService.create(customApprovar));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICustomApprovar>>): void {
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

  protected updateForm(customApprovar: ICustomApprovar): void {
    this.customApprovar = customApprovar;
    this.customApprovarFormService.resetForm(this.editForm, customApprovar);
  }
}
