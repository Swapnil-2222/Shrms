import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { CustomLeavePolicyComponent } from './list/custom-leave-policy.component';
import { CustomLeavePolicyDetailComponent } from './detail/custom-leave-policy-detail.component';
import { CustomLeavePolicyUpdateComponent } from './update/custom-leave-policy-update.component';
import { CustomLeavePolicyDeleteDialogComponent } from './delete/custom-leave-policy-delete-dialog.component';
import { CustomLeavePolicyRoutingModule } from './route/custom-leave-policy-routing.module';

@NgModule({
  imports: [SharedModule, CustomLeavePolicyRoutingModule],
  declarations: [
    CustomLeavePolicyComponent,
    CustomLeavePolicyDetailComponent,
    CustomLeavePolicyUpdateComponent,
    CustomLeavePolicyDeleteDialogComponent,
  ],
})
export class CustomLeavePolicyModule {}
