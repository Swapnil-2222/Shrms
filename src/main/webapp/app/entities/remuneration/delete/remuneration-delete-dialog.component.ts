import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IRemuneration } from '../remuneration.model';
import { RemunerationService } from '../service/remuneration.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './remuneration-delete-dialog.component.html',
})
export class RemunerationDeleteDialogComponent {
  remuneration?: IRemuneration;

  constructor(protected remunerationService: RemunerationService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.remunerationService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
