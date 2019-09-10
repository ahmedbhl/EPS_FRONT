import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Subject } from 'rxjs';
import { UserService } from 'src/app/core/authentication/user.service';
import { SnackBarService } from 'src/app/core/snack-bar.service';
import { Role } from 'src/app/shared/models/role';
import { User } from 'src/app/shared/models/user.class';
import { EducationalInstitution } from '../../educational-institution/model/educational-institution';
import { EducationalInstitutionService } from '../../educational-institution/services/educational-institution.service';

@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.css'],
  providers: [DatePipe]
})
export class UserModalComponent implements OnInit {

  professorForm: FormGroup;
  administrationForm: FormGroup;
  studentForm: FormGroup;
  selectedTabIndex: number;

  // Private
  private _unsubscribeAll: Subject<any>;
  private user: User;
  private selectedTab = 0;
  private educationalInstitutions: EducationalInstitution[];
  public action: string;

  constructor(public dialogRef: MatDialogRef<UserModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _formBuilder: FormBuilder,
    private userService: UserService,
    private readonly educationalInstitutionService: EducationalInstitutionService,
    private snackBar: SnackBarService,
    private datePipe: DatePipe) {

    // Set the private defaults
    this._unsubscribeAll = new Subject();

    this.user = data.user;
    this.action = data.action;
  }

  ngOnInit() {
    this.getAllEducationalInstitution();
    this.initFormAdministration();
    this.initFormProfessor();
    this.initFormStudent();
    this.checkAndInitFormBeforeDisplay();
  }

  checkAndInitFormBeforeDisplay() {
    if (this.action && this.action === 'create') {
    } else if (this.user && this.action && this.action === 'update') {
      if (this.user.roles[0].name === 'PROFESSOR') {
        this.professorForm.patchValue(this.user);
        this.selectedTabIndex = 1;
      } else if (this.user.roles[0].name === 'ADMINISTRATION') {
        this.administrationForm.patchValue(this.user);
        this.selectedTabIndex = 0;
      } if (this.user.roles[0].name === 'STUDENT') {
        this.studentForm.patchValue(this.user);
        this.studentForm.get('establishment').setValue(this.user.establishment.id);
        this.selectedTabIndex = 2;
      }
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  changeTab(role: any) {
    this.selectedTab = role.tab.origin;
  }

  onSubmit() {
    if (this.action === 'create') {
      const roles = new Role();
      if (this.selectedTab === 0) {
        // stop here if form is invalid
        if (this.administrationForm.invalid) {
          return;
        }
        this.user = Object.assign(new User(), this.administrationForm.value);
        roles.name = 'administration';
      }
      if (this.selectedTab === 1) {
        // stop here if form is invalid
        if (this.professorForm.invalid) {
          return;
        }
        this.user = Object.assign(new User(), this.professorForm.value);
        roles.name = 'professor';
      }
      if (this.selectedTab === 2) {
        // stop here if form is invalid
        if (this.studentForm.invalid) {
          return;
        }
        this.user = Object.assign(new User(), this.studentForm.value);
        this.user.establishment = this.educationalInstitutions.find(item => item.id === this.studentForm.value.establishment);
        this.user.establishment.yearOfFoundation = this.datePipe.transform(this.user.establishment.yearOfFoundation, 'yyyy-MM-dd HH:mm:ss');
        roles.name = 'student';
      }

      this.user.dateOfRegistration = this.datePipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss');
      this.user.roles.push(roles);

      this.save();
    } else if (this.action === 'update') {

      if (this.user.roles[0].name === 'PROFESSOR') {
        this.user = Object.assign(this.user, this.professorForm.value);
      } else if (this.user.roles[0].name === 'ADMINISTRATION') {
        this.user = Object.assign(this.user, this.administrationForm.value);
      } if (this.user.roles[0].name === 'STUDENT') {
        this.user = Object.assign(this.user, this.studentForm.value);
        this.user.establishment = this.educationalInstitutions.find(item => item.id === this.studentForm.value.establishment);
        this.user.establishment.yearOfFoundation = this.datePipe.transform(this.user.establishment.yearOfFoundation, 'yyyy-MM-dd HH:mm:ss');
      }
      this.user.dateOfRegistration = this.datePipe.transform(this.user.dateOfRegistration, 'yyyy-MM-dd HH:mm:ss');
      this.update();

    } else if (this.action === 'delete') {
      this.delete();
    }
  }

  /**
   * init the form Groupe
   */
  initFormAdministration() {
    // Reactive Form
    this.administrationForm = this._formBuilder.group({
      id: [{ value: null, disabled: true }],
      email: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      address: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      profilePicture: ['assets/images/avatars/profile.jpg', Validators.required],
      dateOfRegistration: [new Date(), Validators.required],
      password: [this.randomString(), Validators.required]
    });
  }
  /**
   * init the form Groupe
   */
  initFormProfessor() {
    // Reactive Form
    this.professorForm = this._formBuilder.group({
      id: [{ value: null, disabled: true }],
      email: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      address: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      profilePicture: ['assets/images/avatars/profile.jpg', Validators.required],
      dateOfRegistration: [new Date(), Validators.required],
      password: [this.randomString(), Validators.required]
    });
  }
  /**
   * init the form Groupe
   */
  initFormStudent() {
    // Reactive Form
    this.studentForm = this._formBuilder.group({
      id: [{ value: null, disabled: true }],
      email: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      address: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      profilePicture: ['assets/images/avatars/profile.jpg', Validators.required],
      dateOfRegistration: [new Date(), Validators.required],
      establishment: [null, Validators.required],
      password: [this.randomString(), Validators.required]
    });
  }

  /**
   * Save the new User
   */
  save() {
    this.userService.save(this.user).subscribe((item: User) => {
      if (item) {
        this.snackBar.openSuccessSnackBar('The new User has been added successfully');
        this.dialogRef.close({ user: item });
        console.log('adding new User');
      }
    });
  }

  update() {
    // tslint:disable-next-line: max-line-length
    this.userService.update(this.user).subscribe((item: User) => {
      if (item) {
        this.snackBar.openSuccessSnackBar('The User has been updated successfully');
        this.dialogRef.close({ course: item });
        console.log('update User');
      }
    });
  }

  delete() {
    this.userService.delete(this.user).subscribe((item: User) => {
      if (item) {
        this.snackBar.openSuccessSnackBar('The User has been deleted successfully');
        this.dialogRef.close({ course: item });
        console.log('delete User');
      }
    });
  }

  /**
  * Used for getAll the Educational Institutions
  */
  getAllEducationalInstitution() {
    this.educationalInstitutionService.getAllEducationalInstitution().subscribe(data => {
      this.educationalInstitutions = data;
    });
  }

  /**
  * Generate random String with 6 chars
  */
  randomString() {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    for (let i = 6; i > 0; --i) {
      result += chars[Math.floor(Math.random() * chars.length)];
    }
    return result;
  }

}


