import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NgxPermissionsService } from 'ngx-permissions';
import { AuthenticationService } from './core/authentication/authentication.service';
import { Helper } from './core/helper.service';
import { User } from './shared/models/user.class';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currentUser: User;

  constructor(private readonly matIconRegistry: MatIconRegistry,
    private readonly domSanitizer: DomSanitizer,
    private readonly router: Router,
    private authenticationService: AuthenticationService,
    private readonly permService: NgxPermissionsService,
    private readonly helper: Helper) {

    // Define the path of external icons
    this.matIconRegistry.addSvgIcon('facebook', this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/social/facebook.svg'));
    this.matIconRegistry.addSvgIcon('youtube', this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/social/youtube.svg'));
    this.matIconRegistry.addSvgIcon('linkedin', this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/social/linkedin.svg'));
    this.matIconRegistry.addSvgIcon('twitter', this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/social/twitter.svg'));
    this.matIconRegistry.addSvgIcon('eps', this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/social/eps50.svg'));

    this.authenticationService.currentUser.subscribe(data => {
      if (!data) {
        this.helper.trace('[Error] Impossible to load Current User!');
        return;
      }
      this.currentUser = data
      if (this.currentUser !== null) {
        // Object.keys(this.currentUser.roles)
        this.currentUser.roles.map(item => item.name).forEach((val) => this.permService.addPermission(val, () => {
          return true
        }));
      }
    });
  }
}
