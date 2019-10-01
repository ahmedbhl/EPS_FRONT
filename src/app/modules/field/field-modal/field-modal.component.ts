import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Subject } from 'rxjs';
import { SnackBarService } from 'src/app/core/snack-bar.service';
import { User } from 'src/app/shared/models/user.class';
import { Level } from '../../level/model/level';
import { LevelService } from '../../level/services/level.service';
import { Field } from '../model/field';
import { FieldService } from '../services/field.service';

@Component({
  selector: 'app-field-modal',
  templateUrl: './field-modal.component.html',
  styleUrls: ['./field-modal.component.css']
})
export class FieldModalComponent implements OnInit {

  form: FormGroup;

  // Private
  private _unsubscribeAll: Subject<any>;
  public levels: Level[];
  private field: Field;
  public action: string;
  public currentUser: User;
  constructor(public dialogRef: MatDialogRef<FieldModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _formBuilder: FormBuilder,
    private levelService: LevelService,
    private fieldService: FieldService,
    private snackBar: SnackBarService) {

    // Set the private defaults
    this._unsubscribeAll = new Subject();

    this.field = data.field;
    this.action = data.action;
    this.currentUser = data.currentUser;
  }

  ngOnInit() {
    this.initForm();
    this.getAllLevels();
    this.checkAndInitFormBeforeDisplay();
  }

  checkAndInitFormBeforeDisplay() {
    if (this.action && this.action === 'create') {
    } else if (this.field && this.action && this.action === 'update') {
      this.form.setValue(this.field);
      this.form.get('level').setValue(this.field.level.id);
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
      fieldName: ['', Validators.required],
      description: ['', Validators.required],
      level: [null, Validators.required],
    });
  }

  /**
   * Save the new Class
   */
  save() {
    this.field = Object.assign(new Field(), this.form.value);
    this.field.level = this.levels.find(item => item.id === this.form.value.level);
    this.fieldService.save(this.field).subscribe((item: Field) => {
      if (item) {
        this.snackBar.openSuccessSnackBar('The New Field has been added successfully');
        this.dialogRef.close({ field: item });
        console.log('adding new Field');
      }
    });
  }

  update() {
    this.field = Object.assign(this.field, this.form.value);
    this.field.level = this.levels.find(item => item.id === this.form.value.level);
    // tslint:disable-next-line: max-line-length
    this.fieldService.update(this.field).subscribe((item: Field) => {
      if (item) {
        this.snackBar.openSuccessSnackBar('The Field has been updated successfully');
        this.dialogRef.close({ course: item });
        console.log('update Field');
      }
    });
  }

  delete() {
    this.fieldService.delete(this.field).subscribe((item: Field) => {
      if (item) {
        this.snackBar.openSuccessSnackBar('The Field has been deleted successfully');
        this.dialogRef.close({ course: item });
        console.log('delete Field');
      }
    });
  }


  /**
   * Used for getAll the Levels
   */
  getAllLevels() {
    const roles = this.currentUser ? this.currentUser.roles.map(item => item.name) : [];
    this.levelService.getAllLevels().subscribe(data => {
      this.levels = data;
      if ((roles.indexOf('ADMINISTRATION') > -1) && this.currentUser) {
        this.levels = this.levels.filter(level => level.establishment.administration.id === this.currentUser.id);
      }
    });
  }

}

