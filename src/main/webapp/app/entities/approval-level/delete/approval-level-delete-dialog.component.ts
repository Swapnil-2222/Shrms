import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IApprovalLevel } from '../approval-level.model';
import { ApprovalLevelService } from '../service/approval-level.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './approval-level-delete-dialog.component.html',
})
export class ApprovalLevelDeleteDialogComponent {
  approvalLevel?: IApprovalLevel;

  constructor(protected approvalLevelService: ApprovalLevelService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.approvalLevelService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
