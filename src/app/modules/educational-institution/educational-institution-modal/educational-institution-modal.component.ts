import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Subject } from 'rxjs';
import { UserService } from 'src/app/core/authentication/user.service';
import { SnackBarService } from 'src/app/core/snack-bar.service';
import { Administration } from 'src/app/shared/models/administration';
import { EducationalInstitution } from '../model/educational-institution';
import { EducationalInstitutionService } from '../services/educational-institution.service';

// tslint:disable: max-line-length
@Component({
  selector: 'app-educational-institution-modal',
  templateUrl: './educational-institution-modal.component.html',
  styleUrls: ['./educational-institution-modal.component.css'],
  providers: [DatePipe]
})
export class EducationalInstitutionModalComponent implements OnInit {


  form: FormGroup;

  // Private
  private _unsubscribeAll: Subject<any>;
  public administrations: Administration[];
  private establishement: EducationalInstitution;
  public action: string;

  constructor(public dialogRef: MatDialogRef<EducationalInstitutionModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _formBuilder: FormBuilder,
    private userService: UserService,
    private educationalInstitutionService: EducationalInstitutionService,
    private snackBar: SnackBarService,
    private datePipe: DatePipe) {
    // Set the private defaults
    this._unsubscribeAll = new Subject();

    this.establishement = data.educationalInstitution;
    this.action = data.action;
  }

  ngOnInit() {
    this.initForm();
    this.getAllAdministrationUser();
    this.checkAndInitFormBeforeDisplay();
  }

  checkAndInitFormBeforeDisplay() {
    if (this.action && this.action === 'create') {
    } else if (this.establishement && this.action && this.action === 'update') {
      this.form.setValue(this.establishement);
      this.form.get('administration').setValue(this.establishement.administration.id);
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }
    if (this.action === 'create') {
      this.save();
    } else if (this.action === 'update') {
      this.update();
    } else if (this.action === 'delete') {
      this.delete();
    }
  }

  initForm() {
    // Reactive Form
    this.form = this._formBuilder.group({
      id: [{ value: null, disabled: true }],
      establishmentName: ['', Validators.required],
      description: ['', Validators.required],
      yearOfFoundation: [new Date(), Validators.required],
      location: ['', Validators.required],
      photos: ['assets/images/avatars/profile.jpg', Validators.required],
      administration: [null, Validators.required],
    });
  }

  /**
   * Save new Educationnal Institution
   */
  save() {
    this.establishement = Object.assign(new EducationalInstitution(), this.form.value);
    this.establishement.yearOfFoundation = this.datePipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss');
    this.establishement.administration = this.administrations.find(item => item.id === this.form.value.administration);
    this.establishement.administration.dateOfRegistration = this.datePipe.transform(this.establishement.administration.dateOfRegistration, 'yyyy-MM-dd HH:mm:ss');
    this.educationalInstitutionService.save(this.establishement).subscribe(item => {
      if (item) {
        this.snackBar.openSuccessSnackBar('The new Level has been added successfully');
        this.dialogRef.close({ level: item });
        console.log('adding new education instution');
      }
    });
  }


  /**
   * update the Educationnal Institution
   */
  update() {
    this.establishement = Object.assign(this.establishement, this.form.value);
    this.establishement.yearOfFoundation = this.datePipe.transform(this.establishement.yearOfFoundation, 'yyyy-MM-dd HH:mm:ss');
    this.establishement.administration = this.administrations.find(item => item.id === this.form.value.administration);
    this.establishement.administration.dateOfRegistration = this.datePipe.transform(this.establishement.administration.dateOfRegistration, 'yyyy-MM-dd HH:mm:ss');
    this.educationalInstitutionService.update(this.establishement).subscribe((item: EducationalInstitution) => {
      if (item) {
        this.snackBar.openSuccessSnackBar('The Educationa lInstitution has been updated successfully');
        this.dialogRef.close({ educationalInstitution: item });
        console.log('update Educational Institution');
      }
    });
  }


  /**
   * Delete the Educationnal Institution
   */
  delete() {
    this.educationalInstitutionService.delete(this.establishement).subscribe((item: EducationalInstitution) => {
      if (item) {
        this.snackBar.openSuccessSnackBar('The Educational Institution has been deleted successfully');
        this.dialogRef.close({ educationalInstitution: item });
        console.log('delete Educational Institution');
      }
    });
  }

  getAllAdministrationUser() {
    this.userService.getAllAdministrations().subscribe(administration => {
      this.administrations = administration;
    });
  }
}
