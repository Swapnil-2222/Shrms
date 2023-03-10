import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ISalarySettings } from '../salary-settings.model';
import { SalarySettingsService } from '../service/salary-settings.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './salary-settings-delete-dialog.component.html',
})
export class SalarySettingsDeleteDialogComponent {
  salarySettings?: ISalarySettings;

  constructor(protected salarySettingsService: SalarySettingsService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.salarySettingsService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
