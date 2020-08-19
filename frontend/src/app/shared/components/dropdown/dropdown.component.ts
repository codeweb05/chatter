import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
})
export class DropdownComponent implements OnInit {
  showDropdown = false;
  constructor() {}

  ngOnInit(): void {}
  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }
}
