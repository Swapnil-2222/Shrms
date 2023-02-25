import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICustomApprovar } from '../custom-approvar.model';

@Component({
  selector: 'jhi-custom-approvar-detail',
  templateUrl: './custom-approvar-detail.component.html',
})
export class CustomApprovarDetailComponent implements OnInit {
  customApprovar: ICustomApprovar | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ customApprovar }) => {
      this.customApprovar = customApprovar;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
