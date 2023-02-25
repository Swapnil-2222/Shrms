import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { PfDetailsFormService, PfDetailsFormGroup } from './pf-details-form.service';
import { IPfDetails } from '../pf-details.model';
import { PfDetailsService } from '../service/pf-details.service';

@Component({
  selector: 'jhi-pf-details-update',
  templateUrl: './pf-details-update.component.html',
})
export class PfDetailsUpdateComponent implements OnInit {
  isSaving = false;
  pfDetails: IPfDetails | null = null;

  editForm: PfDetailsFormGroup = this.pfDetailsFormService.createPfDetailsFormGroup();

  constructor(
    protected pfDetailsService: PfDetailsService,
    protected pfDetailsFormService: PfDetailsFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ pfDetails }) => {
      this.pfDetails = pfDetails;
      if (pfDetails) {
        this.updateForm(pfDetails);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const pfDetails = this.pfDetailsFormService.getPfDetails(this.editForm);
    if (pfDetails.id !== null) {
      this.subscribeToSaveResponse(this.pfDetailsService.update(pfDetails));
    } else {
      this.subscribeToSaveResponse(this.pfDetailsService.create(pfDetails));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPfDetails>>): void {
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

  protected updateForm(pfDetails: IPfDetails): void {
    this.pfDetails = pfDetails;
    this.pfDetailsFormService.resetForm(this.editForm, pfDetails);
  }
}
