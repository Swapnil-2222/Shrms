import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ApprovalSettingDetailComponent } from './approval-setting-detail.component';

describe('ApprovalSetting Management Detail Component', () => {
  let comp: ApprovalSettingDetailComponent;
  let fixture: ComponentFixture<ApprovalSettingDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApprovalSettingDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ approvalSetting: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(ApprovalSettingDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(ApprovalSettingDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load approvalSetting on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.approvalSetting).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
