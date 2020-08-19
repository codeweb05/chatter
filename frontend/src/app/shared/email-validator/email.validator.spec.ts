import { EmailValidator } from './email.validator';
import { FormControl } from '@angular/forms';

describe('EmailValidator', () => {
  describe('#valid', () => {
    describe('control value is null', () => {
      it('returns null', () => {
        const control = new FormControl(null);

        expect(EmailValidator.valid(control)).toBeNull();
      });
    });

    describe('control value is not null', () => {
      describe('value is a valid email', () => {
        it('returns null', () => {
          const control = new FormControl('john@doe.com');

          expect(EmailValidator.valid(control)).toBeNull();
        });
      });

      describe('value is not a valid email', () => {
        it('returns an object with the invalid state', () => {
          const control = new FormControl('john');

          expect(EmailValidator.valid(control)).toEqual({ invalidEmail: true });
        });
      });
    });
  });
});
