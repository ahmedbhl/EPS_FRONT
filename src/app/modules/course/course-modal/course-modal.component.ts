import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Subject } from 'rxjs';
import { UserService } from 'src/app/core/authentication/user.service';
import { SnackBarService } from 'src/app/core/snack-bar.service';
import { User } from 'src/app/shared/models/user.class';
import { Classe } from '../../classe/model/Classe';
import { ClasseService } from '../../classe/services/classe.service';
import { Course } from '../model/course';
import { CourseService } from '../services/course.service';

@Component({
  selector: 'app-course-modal',
  templateUrl: './course-modal.component.html',
  styleUrls: ['./course-modal.component.css'],
  providers: [DatePipe]
})
export class CourseModalComponent implements OnInit {

  form: FormGroup;

  // Private
  private _unsubscribeAll: Subject<any>;
  public classes: Classe[];
  public professors: User[];
  private course: Course;

  constructor(public dialogRef: MatDialogRef<CourseModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _formBuilder: FormBuilder,
    private classeService: ClasseService,
    private professorService: UserService,
    private courseService: CourseService,
    private snackBar: SnackBarService,
    private datePipe: DatePipe) {

    // Set the private defaults
    this._unsubscribeAll = new Subject();
  }

  ngOnInit() {
    this.initForm();
    this.getAllClasses();
    this.getAllProfessors();
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
      courseName: ['', Validators.required],
      description: ['', Validators.required],
      classe: [null, Validators.required],
      professor: [null, Validators.required],
    });
  }

  /**
   * Save the new Class
   */
  save() {
    this.course = Object.assign(new Course(), this.form.value);
    this.course.professor.dateOfRegistration = this.datePipe.transform( this.course.professor.dateOfRegistration, 'yyyy-MM-dd HH:mm:ss');
    this.courseService.save(this.course).subscribe((item: Course) => {
      if (item) {
        this.snackBar.openSuccessSnackBar('The new Course has been added successfully');
        this.dialogRef.close({ course: item });
        console.log('adding new Course');
      }
    });
  }
  /**
   * Used for getAll the Classes
   */
  getAllClasses() {
    this.classeService.getAllClasses().subscribe(data => {
      this.classes = data;
    });
  }

  /**
  * Used for getAll the Professors
  */
  getAllProfessors() {
    this.professorService.getAllProfessors().subscribe(data => {
      this.professors = data;
    });
  }

}

