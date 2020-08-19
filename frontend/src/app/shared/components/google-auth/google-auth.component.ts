import { Component, OnInit, Input } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-google-auth',
  templateUrl: './google-auth.component.html',
  styleUrls: ['./google-auth.component.scss'],
})
export class GoogleAuthComponent implements OnInit {
  @Input() loading = false;
  constructor() {}

  ngOnInit(): void {}

  login() {
    window.location.href = environment.googleAuth;
  }
}
