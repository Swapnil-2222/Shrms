import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IWorkDaysSetting } from '../work-days-setting.model';

@Component({
  selector: 'jhi-work-days-setting-detail',
  templateUrl: './work-days-setting-detail.component.html',
})
export class WorkDaysSettingDetailComponent implements OnInit {
  workDaysSetting: IWorkDaysSetting | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ workDaysSetting }) => {
      this.workDaysSetting = workDaysSetting;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
