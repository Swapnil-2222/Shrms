import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IApprovalLevel } from '../approval-level.model';

@Component({
  selector: 'jhi-approval-level-detail',
  templateUrl: './approval-level-detail.component.html',
})
export class ApprovalLevelDetailComponent implements OnInit {
  approvalLevel: IApprovalLevel | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ approvalLevel }) => {
      this.approvalLevel = approvalLevel;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
