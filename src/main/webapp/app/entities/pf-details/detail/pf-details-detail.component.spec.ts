import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PfDetailsDetailComponent } from './pf-details-detail.component';

describe('PfDetails Management Detail Component', () => {
  let comp: PfDetailsDetailComponent;
  let fixture: ComponentFixture<PfDetailsDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PfDetailsDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ pfDetails: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(PfDetailsDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(PfDetailsDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load pfDetails on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.pfDetails).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
