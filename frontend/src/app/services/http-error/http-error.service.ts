import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertPopupComponent } from '../popups/alert-popup/alert-popup.component';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class HttpErrorService {
  constructor(private _ngbModal: NgbModal, private authService: AuthService) {}

  showError(errors: string) {
    this.authService.logout();
    const modalRef = this._ngbModal.open(AlertPopupComponent);
    modalRef.componentInstance.errorMessage = errors;
  }
}
