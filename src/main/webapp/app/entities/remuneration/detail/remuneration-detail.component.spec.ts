import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { RemunerationDetailComponent } from './remuneration-detail.component';

describe('Remuneration Management Detail Component', () => {
  let comp: RemunerationDetailComponent;
  let fixture: ComponentFixture<RemunerationDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RemunerationDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ remuneration: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(RemunerationDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(RemunerationDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load remuneration on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.remuneration).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
