import { AbstractControl } from '@angular/forms';

export const validEmailRegex = /^[a-zA-Z0-9](?!.*?[^\na-zA-Z0-9]{2})[^\s@]+@[^\s@]+\.[^\s@]+[a-zA-Z0-9]$/;

export class EmailValidator {
  static valid({ value }: AbstractControl) {
    if (!value) {
      return null;
    }

    const valid = value.match(validEmailRegex);

    return valid ? null : { invalidEmail: true };
  }
}
