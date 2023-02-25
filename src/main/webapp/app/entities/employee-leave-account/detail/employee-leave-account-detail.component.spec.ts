import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { EmployeeLeaveAccountDetailComponent } from './employee-leave-account-detail.component';

describe('EmployeeLeaveAccount Management Detail Component', () => {
  let comp: EmployeeLeaveAccountDetailComponent;
  let fixture: ComponentFixture<EmployeeLeaveAccountDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmployeeLeaveAccountDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ employeeLeaveAccount: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(EmployeeLeaveAccountDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(EmployeeLeaveAccountDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load employeeLeaveAccount on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.employeeLeaveAccount).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
