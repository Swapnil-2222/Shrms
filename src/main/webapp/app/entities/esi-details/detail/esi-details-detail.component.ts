import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IEsiDetails } from '../esi-details.model';

@Component({
  selector: 'jhi-esi-details-detail',
  templateUrl: './esi-details-detail.component.html',
})
export class EsiDetailsDetailComponent implements OnInit {
  esiDetails: IEsiDetails | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ esiDetails }) => {
      this.esiDetails = esiDetails;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
