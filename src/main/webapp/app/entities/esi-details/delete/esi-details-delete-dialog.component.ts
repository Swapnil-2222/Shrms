import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IEsiDetails } from '../esi-details.model';
import { EsiDetailsService } from '../service/esi-details.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './esi-details-delete-dialog.component.html',
})
export class EsiDetailsDeleteDialogComponent {
  esiDetails?: IEsiDetails;

  constructor(protected esiDetailsService: EsiDetailsService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.esiDetailsService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
