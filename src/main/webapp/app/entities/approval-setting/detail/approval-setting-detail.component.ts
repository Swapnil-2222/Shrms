import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IApprovalSetting } from '../approval-setting.model';

@Component({
  selector: 'jhi-approval-setting-detail',
  templateUrl: './approval-setting-detail.component.html',
})
export class ApprovalSettingDetailComponent implements OnInit {
  approvalSetting: IApprovalSetting | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ approvalSetting }) => {
      this.approvalSetting = approvalSetting;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
