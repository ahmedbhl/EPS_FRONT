import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Subject } from 'rxjs';
import { SnackBarService } from 'src/app/core/snack-bar.service';
import { Field } from '../../field/model/field';
import { FieldService } from '../../field/services/field.service';
import { Classe } from '../model/Classe';
import { ClasseService } from '../services/classe.service';
import { User } from 'src/app/shared/models/user.class';

@Component({
  selector: 'app-classe-modal',
  templateUrl: './classe-modal.component.html',
  styleUrls: ['./classe-modal.component.css']
})
export class ClasseModalComponent implements OnInit {

  form: FormGroup;
  public currentUser: User;
  // Private
  private _unsubscribeAll: Subject<any>;
  public fields: Field[];
  public classe: Classe;
  public action: string;

  constructor(public dialogRef: MatDialogRef<ClasseModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _formBuilder: FormBuilder,
    private fieldService: FieldService,
    private classeService: ClasseService,
    private snackBar: SnackBarService) {

    // Set the private defaults
    this._unsubscribeAll = new Subject();

    this.classe = data.classe;
    this.action = data.action;
    this.currentUser = data.currentUser;
  }

  ngOnInit() {
    this.initForm();
    this.getAllFields();
    this.checkAndInitFormBeforeDisplay();
  }

  checkAndInitFormBeforeDisplay() {
    if (this.action && this.action === 'create') {
      // this.form.setValue(this.classe);
    } else if (this.classe && this.action && this.action === 'update') {
      this.form.setValue(this.classe);
      this.form.get('field').setValue(this.classe.field.id);
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
    this.classe.field = this.fields.find(item => item.id === this.form.value.field);
    // tslint:disable-next-line: max-line-length
    this.classeService.save(this.classe).subscribe((item: Classe) => {
      if (item) {
        this.snackBar.openSuccessSnackBar('The new class has been added successfully');
        this.dialogRef.close({ class: item });
        console.log('adding new class');
      }
    });
  }

  update() {
    this.classe = Object.assign(this.classe, this.form.value);
    this.classe.field = this.fields.find(item => item.id === this.form.value.field);
    // tslint:disable-next-line: max-line-length
    this.classeService.update(this.classe).subscribe((item: Classe) => {
      if (item) {
        this.snackBar.openSuccessSnackBar('The class has been updated successfully');
        this.dialogRef.close({ class: item });
        console.log('update class');
      }
    });
  }

  delete() {
    this.classeService.delete(this.classe).subscribe((item: Classe) => {
      if (item) {
        this.snackBar.openSuccessSnackBar('The class has been deleted successfully');
        this.dialogRef.close({ class: item });
        console.log('delete class');
      }
    });
  }

  /**
   * Used for getAll the fields
   */
  getAllFields() {
    const roles = this.currentUser ? this.currentUser.roles.map(item => item.name) : [];
    this.fieldService.getAllFields().subscribe(data => {
      this.fields = data;
      if ((roles.indexOf('ADMINISTRATION') > -1) && this.currentUser) {
        this.fields = this.fields.filter(field => field.level.establishment.administration.id === this.currentUser.id);
      }
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
