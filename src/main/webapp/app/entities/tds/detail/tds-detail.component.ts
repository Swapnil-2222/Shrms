import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITds } from '../tds.model';

@Component({
  selector: 'jhi-tds-detail',
  templateUrl: './tds-detail.component.html',
})
export class TdsDetailComponent implements OnInit {
  tds: ITds | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ tds }) => {
      this.tds = tds;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
