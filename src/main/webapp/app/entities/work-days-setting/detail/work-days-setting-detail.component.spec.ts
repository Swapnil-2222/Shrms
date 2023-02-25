import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { WorkDaysSettingDetailComponent } from './work-days-setting-detail.component';

describe('WorkDaysSetting Management Detail Component', () => {
  let comp: WorkDaysSettingDetailComponent;
  let fixture: ComponentFixture<WorkDaysSettingDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WorkDaysSettingDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ workDaysSetting: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(WorkDaysSettingDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(WorkDaysSettingDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load workDaysSetting on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.workDaysSetting).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
