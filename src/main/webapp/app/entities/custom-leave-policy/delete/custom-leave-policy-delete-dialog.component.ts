import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ICustomLeavePolicy } from '../custom-leave-policy.model';
import { CustomLeavePolicyService } from '../service/custom-leave-policy.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './custom-leave-policy-delete-dialog.component.html',
})
export class CustomLeavePolicyDeleteDialogComponent {
  customLeavePolicy?: ICustomLeavePolicy;

  constructor(protected customLeavePolicyService: CustomLeavePolicyService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.customLeavePolicyService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
