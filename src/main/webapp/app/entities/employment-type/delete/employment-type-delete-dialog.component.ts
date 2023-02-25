import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IEmploymentType } from '../employment-type.model';
import { EmploymentTypeService } from '../service/employment-type.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './employment-type-delete-dialog.component.html',
})
export class EmploymentTypeDeleteDialogComponent {
  employmentType?: IEmploymentType;

  constructor(protected employmentTypeService: EmploymentTypeService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.employmentTypeService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
