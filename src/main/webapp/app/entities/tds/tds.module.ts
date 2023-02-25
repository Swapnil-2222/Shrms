import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { TdsComponent } from './list/tds.component';
import { TdsDetailComponent } from './detail/tds-detail.component';
import { TdsUpdateComponent } from './update/tds-update.component';
import { TdsDeleteDialogComponent } from './delete/tds-delete-dialog.component';
import { TdsRoutingModule } from './route/tds-routing.module';

@NgModule({
  imports: [SharedModule, TdsRoutingModule],
  declarations: [TdsComponent, TdsDetailComponent, TdsUpdateComponent, TdsDeleteDialogComponent],
})
export class TdsModule {}
