import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';
import { User } from '../models/user.class';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent {

  isProfessorOrStudent = false;

  currentUser: User;

  isHandset: boolean = false;
  /*$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );*/

  constructor(private breakpointObserver: BreakpointObserver,
    private authenticationService: AuthenticationService,
    private router: Router) {
    console.log('isProfessorOrStudent = > ' + this.isProfessorOrStudent)

    this.authenticationService.currentUser.subscribe(data => {
      this.currentUser = data
      const roles = this.currentUser ? this.currentUser.roles.map(item => item.name) : [];
      if (roles.indexOf('PROFESSOR') > -1 || roles.indexOf('STUDENT') > -1) {
        this.isProfessorOrStudent = true;
      } else {
        this.isProfessorOrStudent = false;
      }
    });
  }
  dock() {
    this.isHandset = !this.isHandset;
  }
  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

}
