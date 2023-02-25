import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CustomApprovarDetailComponent } from './custom-approvar-detail.component';

describe('CustomApprovar Management Detail Component', () => {
  let comp: CustomApprovarDetailComponent;
  let fixture: ComponentFixture<CustomApprovarDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomApprovarDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ customApprovar: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(CustomApprovarDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(CustomApprovarDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load customApprovar on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.customApprovar).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
