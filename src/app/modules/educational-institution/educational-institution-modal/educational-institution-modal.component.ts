import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Subject } from 'rxjs';
import { UserService } from 'src/app/core/authentication/user.service';
import { User } from 'src/app/shared/models/user.class';
import { EducationalInstitution } from '../model/educational-institution';
import { EducationalInstitutionService } from '../services/educational-institution.service';

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
  public administrations: User[];
  private establishement: EducationalInstitution;

  constructor(public dialogRef: MatDialogRef<EducationalInstitutionModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _formBuilder: FormBuilder,
    private userService: UserService,
    private educationalInstitutionService: EducationalInstitutionService,
    private datePipe: DatePipe) {
    // Set the private defaults
    this._unsubscribeAll = new Subject();
  }

  ngOnInit() {
    this.initForm();
    this.getAllAdministrationUser();

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }
    this.establishement = Object.assign(new EducationalInstitution(), this.form.value);
    this.establishement.yearOfFoundation = this.datePipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss');
    // tslint:disable-next-line: max-line-length
    this.establishement.administration.dateOfRegistration = this.datePipe.transform(this.establishement.administration.dateOfRegistration, 'yyyy-MM-dd HH:mm:ss');
    this.educationalInstitutionService.save(this.establishement).subscribe(item => {
      console.log("adding new education instution");
    });


  }

  initForm() {
    // Reactive Form
    this.form = this._formBuilder.group({
      id: [{ value: null, disabled: true }],
      establishmentName: ['', Validators.required],
      description: ['', Validators.required],
      yearOfFoundation: [new Date(), Validators.required],
      location: ['', Validators.required],
      photos: ['', Validators.required],
      administration: [null, Validators.required],
    });
  }
  getAllAdministrationUser() {
    this.userService.getAllAdministrations().subscribe(administration => {
      this.administrations = administration;
    });
  }
}
