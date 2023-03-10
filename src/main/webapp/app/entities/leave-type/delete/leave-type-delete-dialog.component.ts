import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ILeaveType } from '../leave-type.model';
import { LeaveTypeService } from '../service/leave-type.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './leave-type-delete-dialog.component.html',
})
export class LeaveTypeDeleteDialogComponent {
  leaveType?: ILeaveType;

  constructor(protected leaveTypeService: LeaveTypeService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.leaveTypeService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
