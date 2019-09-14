import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Subject } from 'rxjs';
import { SnackBarService } from 'src/app/core/snack-bar.service';
import { Level } from '../../level/model/level';
import { LevelService } from '../../level/services/level.service';
import { Group } from '../model/group';
import { GroupService } from '../services/group.service';

@Component({
  selector: 'app-group-modal',
  templateUrl: './group-modal.component.html',
  styleUrls: ['./group-modal.component.css']
})
export class GroupModalComponent implements OnInit {

  form: FormGroup;

  // Private
  private _unsubscribeAll: Subject<any>;
  public levels: Level[];
  private group: Group;
  public action: string;

  constructor(public dialogRef: MatDialogRef<GroupModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _formBuilder: FormBuilder,
    private levelService: LevelService,
    private groupService: GroupService,
    private snackBar: SnackBarService) {

    // Set the private defaults
    this._unsubscribeAll = new Subject();

    this.group = data.group;
    this.action = data.action;
  }

  ngOnInit() {
    this.initForm();
    this.getAllLevels();
    this.checkAndInitFormBeforeDisplay();
  }

  checkAndInitFormBeforeDisplay() {
    if (this.action && this.action === 'create') {
    } else if (this.group && this.action && this.action === 'update') {
      this.form.setValue(this.group);
     // this.form.get('level').setValue(this.group.level.id);
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
      groupName: ['', Validators.required],
      description: ['', Validators.required],
      level: [null, Validators.required],
    });
  }

  /**
   * Save the new Class
   */
  save() {
    this.group = Object.assign(new Group(), this.form.value);
    this.groupService.save(this.group).subscribe((item: Group) => {
      if (item) {
        this.snackBar.openSuccessSnackBar('The New Group has been added successfully');
        this.dialogRef.close({ group: item });
        console.log('adding new Group');
      }
    });
  }

  update() {
    this.group = Object.assign(this.group, this.form.value);
   // this.group.level = this.levels.find(item => item.id === this.form.value.level);
    // tslint:disable-next-line: max-line-length
    this.groupService.update(this.group).subscribe((item: Group) => {
      if (item) {
        this.snackBar.openSuccessSnackBar('The Group has been updated successfully');
        this.dialogRef.close({ course: item });
        console.log('update Group');
      }
    });
  }

  delete() {
    this.groupService.delete(this.group).subscribe((item: Group) => {
      if (item) {
        this.snackBar.openSuccessSnackBar('The Group has been deleted successfully');
        this.dialogRef.close({ course: item });
        console.log('delete Group');
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

