import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoogleAuthComponent } from './google-auth.component';
import {
  FontAwesomeModule,
  FaIconLibrary,
} from '@fortawesome/angular-fontawesome';

import { faGoogle } from '@fortawesome/free-brands-svg-icons';
@NgModule({
  declarations: [GoogleAuthComponent],
  imports: [CommonModule, FontAwesomeModule],
  exports: [GoogleAuthComponent],
})
export class GoogleAuthModule {
  constructor(library: FaIconLibrary) {
    // Add an icon to the library for convenient access in other components
    library.addIcons(faGoogle);
  }
}
