import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { EsiDetailsDetailComponent } from './esi-details-detail.component';

describe('EsiDetails Management Detail Component', () => {
  let comp: EsiDetailsDetailComponent;
  let fixture: ComponentFixture<EsiDetailsDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EsiDetailsDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ esiDetails: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(EsiDetailsDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(EsiDetailsDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load esiDetails on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.esiDetails).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
