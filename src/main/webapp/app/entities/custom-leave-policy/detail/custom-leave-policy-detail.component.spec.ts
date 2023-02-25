import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CustomLeavePolicyDetailComponent } from './custom-leave-policy-detail.component';

describe('CustomLeavePolicy Management Detail Component', () => {
  let comp: CustomLeavePolicyDetailComponent;
  let fixture: ComponentFixture<CustomLeavePolicyDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomLeavePolicyDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ customLeavePolicy: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(CustomLeavePolicyDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(CustomLeavePolicyDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load customLeavePolicy on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.customLeavePolicy).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
