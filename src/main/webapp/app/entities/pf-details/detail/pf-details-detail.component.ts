import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPfDetails } from '../pf-details.model';

@Component({
  selector: 'jhi-pf-details-detail',
  templateUrl: './pf-details-detail.component.html',
})
export class PfDetailsDetailComponent implements OnInit {
  pfDetails: IPfDetails | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ pfDetails }) => {
      this.pfDetails = pfDetails;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
