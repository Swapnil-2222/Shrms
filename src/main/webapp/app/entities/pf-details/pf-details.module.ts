import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { PfDetailsComponent } from './list/pf-details.component';
import { PfDetailsDetailComponent } from './detail/pf-details-detail.component';
import { PfDetailsUpdateComponent } from './update/pf-details-update.component';
import { PfDetailsDeleteDialogComponent } from './delete/pf-details-delete-dialog.component';
import { PfDetailsRoutingModule } from './route/pf-details-routing.module';

@NgModule({
  imports: [SharedModule, PfDetailsRoutingModule],
  declarations: [PfDetailsComponent, PfDetailsDetailComponent, PfDetailsUpdateComponent, PfDetailsDeleteDialogComponent],
})
export class PfDetailsModule {}
