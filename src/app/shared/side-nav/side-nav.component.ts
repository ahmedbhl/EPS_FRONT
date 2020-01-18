import { BreakpointObserver } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';
import { User } from '../models/user.class';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent {

  isProfessorOrStudent = false;

  currentUser: User;
  profilePictureLink: string;

  isHandset = false;
  isSuperAdmin: boolean;

  constructor(private breakpointObserver: BreakpointObserver,
    private authenticationService: AuthenticationService,
    private router: Router) {
    console.log('isProfessorOrStudent = > ' + this.isProfessorOrStudent);

    this.authenticationService.currentUser.subscribe(data => {
      this.currentUser = data;
      const roles = this.currentUser ? this.currentUser.roles.map(item => item.name) : [];
      if (roles.indexOf('PROFESSOR') > -1 || roles.indexOf('STUDENT') > -1) {
        this.isProfessorOrStudent = true;
      } else {
        this.isSuperAdmin = roles.indexOf('SUPER_ADMIN') ? true : false;
        this.isProfessorOrStudent = false;
      }
      this.getPictureLink();
    });
  }
  dock() {
    this.isHandset = !this.isHandset;
  }
  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

  getPictureLink() {
    if (this.currentUser && this.currentUser.profilePicture) {
      this.profilePictureLink = this.currentUser.profilePicture;
    } else {
      this.profilePictureLink = 'assets/images/avatars/profile.jpg';
    }
  }

}
