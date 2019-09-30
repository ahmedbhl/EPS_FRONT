import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Observable, Subject } from 'rxjs';
import { debounceTime, startWith } from 'rxjs/operators';
import { UserService } from 'src/app/core/authentication/user.service';
import { SnackBarService } from 'src/app/core/snack-bar.service';
import { User } from 'src/app/shared/models/user.class';
import { Level } from '../../level/model/level';
import { LevelService } from '../../level/services/level.service';
import { Group } from '../model/group';
import { GroupService } from '../services/group.service';

@Component({
  selector: 'app-group-modal',
  templateUrl: './group-modal.component.html',
  styleUrls: ['./group-modal.component.css'],
  providers: [DatePipe]
})
export class GroupModalComponent implements OnInit {

  form: FormGroup;

  // Private
  private _unsubscribeAll: Subject<any>;
  public levels: Level[];
  private group: Group;
  public action: string;
  public users: User[] = [];
  usersForm = new FormControl('');
  filtredUsers: Observable<User[]>;


  constructor(public dialogRef: MatDialogRef<GroupModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _formBuilder: FormBuilder,
    private levelService: LevelService,
    private groupService: GroupService,
    public userService: UserService,
    private datePipe: DatePipe,
    private snackBar: SnackBarService) {

    // Set the private defaults
    this._unsubscribeAll = new Subject();

    this.group = data.group;
    this.action = data.action;
  }

  ngOnInit() {
    this.getAllUsers();
    this.initForm();
    this.checkAndInitFormBeforeDisplay();
    this.usersForm.valueChanges.pipe(startWith(''), debounceTime(300)).subscribe(value => {
      this.filtredUsers = value ?
        this.users.filter(option => option.firstName.toLowerCase().indexOf(value.toLocaleLowerCase()) === 0)
        : this.users as any;
    });
  }

  checkAndInitFormBeforeDisplay() {
    if (this.action && this.action === 'create') {
    } else if (this.group && this.action && this.action === 'update') {
      this.form.setValue(this.group);
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
      hashCode: ['', Validators.required],
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
    this.groupService.update(this.group).subscribe((item: Group) => {
      if (item) {
        this.snackBar.openSuccessSnackBar('The Group has been updated successfully');
        this.dialogRef.close({ course: item });
        console.log('update Group');
      }
    });
  }

  joinUser(user) {
    if (user.roles[0].name === 'PROFESSOR') {
      user.dateOfRegistration = this.datePipe.transform(user.dateOfRegistration, 'yyyy-MM-dd HH:mm:ss');
      this.group.professors.push(user);
      this.joinProfessor(user);
    } else if (user.roles[0].name === 'STUDENT') {
      user.dateOfRegistration = this.datePipe.transform(user.dateOfRegistration, 'yyyy-MM-dd HH:mm:ss');
      this.group.students.push(user);
      this.joinStudent(user);
      this.dialogRef.close({ group: this.group });
    }
  }

  joinStudent(user) {
    this.groupService.joinStudent(user.id, this.group.hashCode).subscribe((item: Group) => {
      if (item) {
        this.snackBar.openSuccessSnackBar(`The Student was added to this group`);
        this.dialogRef.close({ group: item });
        console.log('join Student to Group');
      }
    });
  }

  joinProfessor(user) {
    this.groupService.joinProfessor(user.id, this.group.hashCode).subscribe((item: Group) => {
      if (item) {
        this.snackBar.openSuccessSnackBar(`The Professor was added to this group`);
        this.dialogRef.close({ group: item });
        console.log('join Professor to Group');
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

  getAllUsers() {
    this.userService.getAllUsers().subscribe((users: User[]) => {
      if (users.length > 0) {
        this.users = users;
        this.users = this.users.filter(user => (user.roles[0].name !== 'SUPER_ADMIN' && user.roles[0].name !== 'ADMINISTRATION'));
      }
    });
  }

}

