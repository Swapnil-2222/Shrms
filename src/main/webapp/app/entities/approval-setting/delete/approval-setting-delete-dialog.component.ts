import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IApprovalSetting } from '../approval-setting.model';
import { ApprovalSettingService } from '../service/approval-setting.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './approval-setting-delete-dialog.component.html',
})
export class ApprovalSettingDeleteDialogComponent {
  approvalSetting?: IApprovalSetting;

  constructor(protected approvalSettingService: ApprovalSettingService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.approvalSettingService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
