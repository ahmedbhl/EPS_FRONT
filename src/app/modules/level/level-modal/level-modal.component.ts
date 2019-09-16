import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Subject } from 'rxjs';
import { SnackBarService } from 'src/app/core/snack-bar.service';
import { EducationalInstitution } from '../../educational-institution/model/educational-institution';
import { EducationalInstitutionService } from '../../educational-institution/services/educational-institution.service';
import { Level } from '../model/level';
import { LevelService } from '../services/level.service';

@Component({
  selector: 'app-level-modal',
  templateUrl: './level-modal.component.html',
  styleUrls: ['./level-modal.component.css'],
  providers: [DatePipe]
})
export class LevelModalComponent implements OnInit {

  form: FormGroup;

  // Private
  private _unsubscribeAll: Subject<any>;
  public educationalInstitutions: EducationalInstitution[];
  private level: Level;
  public action: string;

  constructor(public dialogRef: MatDialogRef<LevelModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _formBuilder: FormBuilder,
    private levelService: LevelService,
    private educationalInstitutionService: EducationalInstitutionService,
    private snackBar: SnackBarService,
    private datePipe: DatePipe) {

    // Set the private defaults
    this._unsubscribeAll = new Subject();

    this.level = data.level;
    this.action = data.action;
  }

  ngOnInit() {
    this.initForm();
    this.getAllEducationalInstitution();
    this.checkAndInitFormBeforeDisplay();
  }

  checkAndInitFormBeforeDisplay() {
    if (this.action && this.action === 'create') {
    } else if (this.level && this.action && this.action === 'update') {
      this.form.setValue(this.level);
      this.form.get('establishment').setValue(this.level.establishment.id);
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

  /**
   * init the form Groupe
   */
  initForm() {
    // Reactive Form
    this.form = this._formBuilder.group({
      id: [{ value: null, disabled: true }],
      levelName: ['', Validators.required],
      description: ['', Validators.required],
      establishment: [null, Validators.required],
    });
  }

  /**
   * Save the new Class
   */
  save() {
    this.level = Object.assign(new Level(), this.form.value);
    this.level.establishment = this.educationalInstitutions.find(item => item.id === this.form.value.establishment);
    this.level.establishment.yearOfFoundation = this.datePipe.transform(this.level.establishment.yearOfFoundation, 'yyyy-MM-dd HH:mm:ss');
    this.levelService.save(this.level).subscribe((item: Level) => {
      if (item) {
        this.snackBar.openSuccessSnackBar('The new Level has been added successfully');
        this.dialogRef.close({ level: item });
        console.log('adding new Level');
      }
    });
  }

  update() {
    this.level = Object.assign(this.level, this.form.value);
    this.level.establishment = this.educationalInstitutions.find(item => item.id === this.form.value.establishment);
    this.level.establishment.yearOfFoundation = this.datePipe.transform(this.level.establishment.yearOfFoundation, 'yyyy-MM-dd HH:mm:ss');
    // tslint:disable-next-line: max-line-length
    this.levelService.update(this.level).subscribe((item: Level) => {
      if (item) {
        this.snackBar.openSuccessSnackBar('The Level has been updated successfully');
        this.dialogRef.close({ course: item });
        console.log('update Level');
      }
    });
  }

  delete() {
    this.levelService.delete(this.level).subscribe((item: Level) => {
      if (item) {
        this.snackBar.openSuccessSnackBar('The Level has been deleted successfully');
        this.dialogRef.close({ course: item });
        console.log('delete Level');
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

}

