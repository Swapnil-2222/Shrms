import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { EsiDetailsFormService, EsiDetailsFormGroup } from './esi-details-form.service';
import { IEsiDetails } from '../esi-details.model';
import { EsiDetailsService } from '../service/esi-details.service';

@Component({
  selector: 'jhi-esi-details-update',
  templateUrl: './esi-details-update.component.html',
})
export class EsiDetailsUpdateComponent implements OnInit {
  isSaving = false;
  esiDetails: IEsiDetails | null = null;

  editForm: EsiDetailsFormGroup = this.esiDetailsFormService.createEsiDetailsFormGroup();

  constructor(
    protected esiDetailsService: EsiDetailsService,
    protected esiDetailsFormService: EsiDetailsFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ esiDetails }) => {
      this.esiDetails = esiDetails;
      if (esiDetails) {
        this.updateForm(esiDetails);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const esiDetails = this.esiDetailsFormService.getEsiDetails(this.editForm);
    if (esiDetails.id !== null) {
      this.subscribeToSaveResponse(this.esiDetailsService.update(esiDetails));
    } else {
      this.subscribeToSaveResponse(this.esiDetailsService.create(esiDetails));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEsiDetails>>): void {
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

  protected updateForm(esiDetails: IEsiDetails): void {
    this.esiDetails = esiDetails;
    this.esiDetailsFormService.resetForm(this.editForm, esiDetails);
  }
}
