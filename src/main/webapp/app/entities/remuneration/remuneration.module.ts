import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { RemunerationComponent } from './list/remuneration.component';
import { RemunerationDetailComponent } from './detail/remuneration-detail.component';
import { RemunerationUpdateComponent } from './update/remuneration-update.component';
import { RemunerationDeleteDialogComponent } from './delete/remuneration-delete-dialog.component';
import { RemunerationRoutingModule } from './route/remuneration-routing.module';

@NgModule({
  imports: [SharedModule, RemunerationRoutingModule],
  declarations: [RemunerationComponent, RemunerationDetailComponent, RemunerationUpdateComponent, RemunerationDeleteDialogComponent],
})
export class RemunerationModule {}
