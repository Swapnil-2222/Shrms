import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IPfDetails } from '../pf-details.model';
import { PfDetailsService } from '../service/pf-details.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './pf-details-delete-dialog.component.html',
})
export class PfDetailsDeleteDialogComponent {
  pfDetails?: IPfDetails;

  constructor(protected pfDetailsService: PfDetailsService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.pfDetailsService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
