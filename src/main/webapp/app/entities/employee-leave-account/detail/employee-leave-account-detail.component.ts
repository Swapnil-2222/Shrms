import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IEmployeeLeaveAccount } from '../employee-leave-account.model';

@Component({
  selector: 'jhi-employee-leave-account-detail',
  templateUrl: './employee-leave-account-detail.component.html',
})
export class EmployeeLeaveAccountDetailComponent implements OnInit {
  employeeLeaveAccount: IEmployeeLeaveAccount | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ employeeLeaveAccount }) => {
      this.employeeLeaveAccount = employeeLeaveAccount;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
