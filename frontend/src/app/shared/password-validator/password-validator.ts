import { AbstractControl, FormGroup } from '@angular/forms';

const passwordRegex = /^(?=.*[0-9])(?=.*[a-zA-Z]).{8,}$/g;

export class PasswordValidator {
  static valid(control: AbstractControl) {
    if (!control.value) {
      return null;
    }

    const valid = control.value.match(passwordRegex);

    return valid ? null : { invalidPassword: true };
  }
}
