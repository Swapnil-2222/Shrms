import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICustomLeavePolicy } from '../custom-leave-policy.model';

@Component({
  selector: 'jhi-custom-leave-policy-detail',
  templateUrl: './custom-leave-policy-detail.component.html',
})
export class CustomLeavePolicyDetailComponent implements OnInit {
  customLeavePolicy: ICustomLeavePolicy | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ customLeavePolicy }) => {
      this.customLeavePolicy = customLeavePolicy;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
