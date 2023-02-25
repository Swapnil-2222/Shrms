import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { CustomApprovarComponent } from './list/custom-approvar.component';
import { CustomApprovarDetailComponent } from './detail/custom-approvar-detail.component';
import { CustomApprovarUpdateComponent } from './update/custom-approvar-update.component';
import { CustomApprovarDeleteDialogComponent } from './delete/custom-approvar-delete-dialog.component';
import { CustomApprovarRoutingModule } from './route/custom-approvar-routing.module';

@NgModule({
  imports: [SharedModule, CustomApprovarRoutingModule],
  declarations: [
    CustomApprovarComponent,
    CustomApprovarDetailComponent,
    CustomApprovarUpdateComponent,
    CustomApprovarDeleteDialogComponent,
  ],
})
export class CustomApprovarModule {}
