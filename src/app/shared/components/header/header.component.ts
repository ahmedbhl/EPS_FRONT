import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() toggleSidenav = new EventEmitter<void>();
  @Output() toggleNotificationSidenav = new EventEmitter<void>();

  constructor(private readonly router: Router, private authenticationService: AuthenticationService) {
  }

  ngOnInit() {
  }

  open(event) { }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

}
