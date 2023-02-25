import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ICustomApprovar } from '../custom-approvar.model';
import { CustomApprovarService } from '../service/custom-approvar.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './custom-approvar-delete-dialog.component.html',
})
export class CustomApprovarDeleteDialogComponent {
  customApprovar?: ICustomApprovar;

  constructor(protected customApprovarService: CustomApprovarService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.customApprovarService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
