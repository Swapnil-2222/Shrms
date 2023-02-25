import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ApprovalLevelDetailComponent } from './approval-level-detail.component';

describe('ApprovalLevel Management Detail Component', () => {
  let comp: ApprovalLevelDetailComponent;
  let fixture: ComponentFixture<ApprovalLevelDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApprovalLevelDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ approvalLevel: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(ApprovalLevelDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(ApprovalLevelDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load approvalLevel on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.approvalLevel).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
