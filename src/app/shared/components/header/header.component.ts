import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import * as screenfull from 'screenfull';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() toggleSidenav = new EventEmitter<void>();
  @Output() toggleNotificationSidenav = new EventEmitter<void>();

  constructor() {
  }

  fullScreenToggle(): void {
   /* if (screenfull.enabled) {
      screenfull.toggle();
    }*/
  }

  ngOnInit() {
  }

}
