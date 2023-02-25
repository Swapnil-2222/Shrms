import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { EsiDetailsComponent } from './list/esi-details.component';
import { EsiDetailsDetailComponent } from './detail/esi-details-detail.component';
import { EsiDetailsUpdateComponent } from './update/esi-details-update.component';
import { EsiDetailsDeleteDialogComponent } from './delete/esi-details-delete-dialog.component';
import { EsiDetailsRoutingModule } from './route/esi-details-routing.module';

@NgModule({
  imports: [SharedModule, EsiDetailsRoutingModule],
  declarations: [EsiDetailsComponent, EsiDetailsDetailComponent, EsiDetailsUpdateComponent, EsiDetailsDeleteDialogComponent],
})
export class EsiDetailsModule {}
