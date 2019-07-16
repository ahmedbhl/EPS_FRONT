import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NgxPermissionsService } from 'ngx-permissions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  options: FormGroup;

  constructor(private readonly matIconRegistry: MatIconRegistry,
    private readonly domSanitizer: DomSanitizer,
    private readonly router: Router,
    private readonly permService: NgxPermissionsService) {
    //  this.router.navigateByUrl('/');

    // Define the path of external icons
    this.matIconRegistry.addSvgIcon('facebook', this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/social/facebook.svg'));
    this.matIconRegistry.addSvgIcon('youtube', this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/social/youtube.svg'));
    this.matIconRegistry.addSvgIcon('linkedin', this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/social/linkedin.svg'));
    this.matIconRegistry.addSvgIcon('twitter', this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/social/twitter.svg'));
    this.matIconRegistry.addSvgIcon('eps', this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/social/eps50.svg'));

  //  this.permService.addPermission('PROFESSOR');
    ['SUPER_ADMINt', 'PROFESSORt', 'STUDENTt'].forEach((val) => this.permService.addPermission(val, () => {
      return true
  }));
  //  this.router.navigate(['home']);
  
  }

}
