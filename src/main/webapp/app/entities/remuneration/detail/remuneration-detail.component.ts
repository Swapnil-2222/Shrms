import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IRemuneration } from '../remuneration.model';

@Component({
  selector: 'jhi-remuneration-detail',
  templateUrl: './remuneration-detail.component.html',
})
export class RemunerationDetailComponent implements OnInit {
  remuneration: IRemuneration | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ remuneration }) => {
      this.remuneration = remuneration;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
