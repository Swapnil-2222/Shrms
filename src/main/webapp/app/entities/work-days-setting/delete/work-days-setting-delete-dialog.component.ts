import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IWorkDaysSetting } from '../work-days-setting.model';
import { WorkDaysSettingService } from '../service/work-days-setting.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './work-days-setting-delete-dialog.component.html',
})
export class WorkDaysSettingDeleteDialogComponent {
  workDaysSetting?: IWorkDaysSetting;

  constructor(protected workDaysSettingService: WorkDaysSettingService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.workDaysSettingService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
