jest.mock('@ng-bootstrap/ng-bootstrap');

import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { CustomLeavePolicyService } from '../service/custom-leave-policy.service';

import { CustomLeavePolicyDeleteDialogComponent } from './custom-leave-policy-delete-dialog.component';

describe('CustomLeavePolicy Management Delete Component', () => {
  let comp: CustomLeavePolicyDeleteDialogComponent;
  let fixture: ComponentFixture<CustomLeavePolicyDeleteDialogComponent>;
  let service: CustomLeavePolicyService;
  let mockActiveModal: NgbActiveModal;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [CustomLeavePolicyDeleteDialogComponent],
      providers: [NgbActiveModal],
    })
      .overrideTemplate(CustomLeavePolicyDeleteDialogComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(CustomLeavePolicyDeleteDialogComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(CustomLeavePolicyService);
    mockActiveModal = TestBed.inject(NgbActiveModal);
  });

  describe('confirmDelete', () => {
    it('Should call delete service on confirmDelete', inject(
      [],
      fakeAsync(() => {
        // GIVEN
        jest.spyOn(service, 'delete').mockReturnValue(of(new HttpResponse({ body: {} })));

        // WHEN
        comp.confirmDelete(123);
        tick();

        // THEN
        expect(service.delete).toHaveBeenCalledWith(123);
        expect(mockActiveModal.close).toHaveBeenCalledWith('deleted');
      })
    ));

    it('Should not call delete service on clear', () => {
      // GIVEN
      jest.spyOn(service, 'delete');

      // WHEN
      comp.cancel();

      // THEN
      expect(service.delete).not.toHaveBeenCalled();
      expect(mockActiveModal.close).not.toHaveBeenCalled();
      expect(mockActiveModal.dismiss).toHaveBeenCalled();
    });
  });
});
