import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Subject } from 'rxjs';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';
import { SnackBarService } from 'src/app/core/snack-bar.service';
import { User } from 'src/app/shared/models/user.class';
import { Library } from '../model/library';
import { LibraryService } from '../services/library.service';

@Component({
  selector: 'app-library-modal',
  templateUrl: './library-modal.component.html',
  styleUrls: ['./library-modal.component.css']
})
export class LibraryModalComponent implements OnInit {

  form: FormGroup;
  currentUser: User;
  libraryFolderNames: String[];

  // Private
  private _unsubscribeAll: Subject<any>;
  private library: Library;
  public action: string;

  constructor(public dialogRef: MatDialogRef<LibraryModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private readonly _authenticationService: AuthenticationService,
    private _formBuilder: FormBuilder,
    private _libraryService: LibraryService,
    private snackBar: SnackBarService) {
    this._authenticationService.currentUser.subscribe(user => {
      this.currentUser = user;
    });

    // Set the private defaults
    this._unsubscribeAll = new Subject();

    this.action = data.action;
  }

  ngOnInit() {
    this.initForm();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }
    if (this.form.get('folderName').value) {
      this.checkFolderNameExistOrNotAndSave(this.form.get('folderName').value);
    }

  }


  /**
   * init the form Groupe
   */
  initForm() {
    // Reactive Form
    this.form = this._formBuilder.group({
      folderName: ['', Validators.required],
    });
  }

  createFolder(folderName: String) {
    if (this.currentUser) {
      this._libraryService.createFolder(`${this.currentUser.id}/${folderName}`).subscribe();
    }
  }

  checkFolderNameExistOrNotAndSave(folderName: String) {
    this._libraryService.getAlllibrarys(this.currentUser.id).subscribe(
      (data: Library[]) => {
        this.libraryFolderNames = data.map(lib => lib.name);
        if (this.libraryFolderNames.indexOf(folderName) === -1) {
          this.createFolder(this.form.get('folderName').value);
          this.dialogRef.close({ library: null });
        } else {
          this.form.get('folderName').setErrors({ erro: 'error' });
        }
      });
  }

}

