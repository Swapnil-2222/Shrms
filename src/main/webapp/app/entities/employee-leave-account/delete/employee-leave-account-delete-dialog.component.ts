import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IEmployeeLeaveAccount } from '../employee-leave-account.model';
import { EmployeeLeaveAccountService } from '../service/employee-leave-account.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './employee-leave-account-delete-dialog.component.html',
})
export class EmployeeLeaveAccountDeleteDialogComponent {
  employeeLeaveAccount?: IEmployeeLeaveAccount;

  constructor(protected employeeLeaveAccountService: EmployeeLeaveAccountService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.employeeLeaveAccountService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
