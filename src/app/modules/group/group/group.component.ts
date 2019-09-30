import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';
import { User } from 'src/app/shared/models/user.class';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css'],
  providers: [DatePipe]

})
export class GroupComponent implements OnInit {

  actionForm: string;
  currentUser: User;
  profilePictureLink: string;
  formPost: FormGroup;
  type: string;
  selectedMenu: string;



  constructor(private authenticationService: AuthenticationService,
    private _formBuilder: FormBuilder, private datePipe: DatePipe) { }

  ngOnInit() {
    this.selectMenu('posts');
    this.type = 'group';
    this.initCurrentUser();
    this.initForm();
    this.getPictureLink();
  }

  initCurrentUser() {
    this.authenticationService.currentUser.subscribe(data => {
      this.currentUser = data;
      const roles = this.currentUser ? this.currentUser.roles.map(item => item.name) : [];
      if (roles.indexOf('PROFESSOR') > -1 || roles.indexOf('STUDENT') > -1) {
        this.actionForm = 'professorOrStudentUI';

      } else if (roles.indexOf('SUPER_ADMIN') > -1) {
        this.actionForm = 'SuperAdminOrAdministrationUI';
      }
    });
  }

  initForm() {
    // Reactive Form
    this.formPost = this._formBuilder.group({
      id: [{ value: null, disabled: true }],
      type: [this.type, Validators.required],
      description: ['', Validators.required],
      postPicture: [null],
      postDate: [new Date()],
      user: [this.currentUser],
    });
  }


  getPictureLink() {
    if (this.currentUser && this.currentUser.profilePicture) {
      this.profilePictureLink = `${this.currentUser.profilePicture}`;
    } else {
      this.profilePictureLink = 'assets/images/avatars/profile.jpg';
    }
  }

  selectMenu(selectedMenu: string) {
    this.selectedMenu = selectedMenu;
    this.getPictureLink();
    console.log('this select enu  = ' + selectedMenu);
  }
}
