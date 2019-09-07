import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Subject } from 'rxjs';
import { SnackBarService } from 'src/app/core/snack-bar.service';
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

  constructor(public dialogRef: MatDialogRef<FieldModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _formBuilder: FormBuilder,
    private levelService: LevelService,
    private fieldService: FieldService,
    private snackBar: SnackBarService) {

    // Set the private defaults
    this._unsubscribeAll = new Subject();
  }

  ngOnInit() {
    this.initForm();
    this.getAllLevels();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }
    this.save();
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
    this.fieldService.save(this.field).subscribe((item: Field) => {
      if (item) {
        this.snackBar.openSuccessSnackBar('The newField has been added successfully');
        this.dialogRef.close({ field: item });
        console.log('adding newField');
      }
    });
  }
  /**
   * Used for getAll the Levels
   */
  getAllLevels() {
    this.levelService.getAllLevels().subscribe(data => {
      this.levels = data;
    });
  }

}

