import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Subject } from 'rxjs';
import { SnackBarService } from 'src/app/core/snack-bar.service';
import { Field } from '../../field/model/field';
import { FieldService } from '../../field/services/field.service';
import { Classe } from '../model/Classe';
import { ClasseService } from '../services/classe.service';

@Component({
  selector: 'app-classe-modal',
  templateUrl: './classe-modal.component.html',
  styleUrls: ['./classe-modal.component.css']
})
export class ClasseModalComponent implements OnInit {

  form: FormGroup;

  // Private
  private _unsubscribeAll: Subject<any>;
  public fields: Field[];
  private classe: Classe;

  constructor(public dialogRef: MatDialogRef<ClasseModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _formBuilder: FormBuilder,
    private fieldService: FieldService,
    private classeService: ClasseService,
    private snackBar: SnackBarService) {

    // Set the private defaults
    this._unsubscribeAll = new Subject();
  }

  ngOnInit() {
    this.initForm();
    this.getAllFields();

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
      className: ['', Validators.required],
      description: ['', Validators.required],
      invitationCode: [this.randomString(), Validators.required],
      field: [null, Validators.required],
    });
  }

  /**
   * Save the new Class
   */
  save() {
    this.classe = Object.assign(new Classe(), this.form.value);
    // tslint:disable-next-line: max-line-length
    this.classeService.save(this.classe).subscribe((item: Classe) => {
      if (item) {
        this.snackBar.openSuccessSnackBar('The new class has been added successfully');
        this.dialogRef.close({ class: item });
        console.log('adding new class');
      }
    });
  }
  /**
   * Used for getAll the fields
   */
  getAllFields() {
    this.fieldService.getAllFields().subscribe(data => {
      this.fields = data;
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
