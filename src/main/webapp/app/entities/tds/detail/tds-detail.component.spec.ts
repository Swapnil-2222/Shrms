import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TdsDetailComponent } from './tds-detail.component';

describe('Tds Management Detail Component', () => {
  let comp: TdsDetailComponent;
  let fixture: ComponentFixture<TdsDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TdsDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ tds: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(TdsDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(TdsDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load tds on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.tds).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
