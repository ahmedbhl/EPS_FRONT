import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';
import { Helper } from 'src/app/core/helper.service';
import { User } from 'src/app/shared/models/user.class';
import { CourseModalComponent } from '../course-modal/course-modal.component';
import { Course } from '../model/course';
import { CourseService } from '../services/course.service';


@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {

  Courses: Course[] = [];
  currentUser: User;
  displayedColumns: string[] = ['select', 'courseName', 'description', 'classe', 'professor', 'more'];
  dataSource: MatTableDataSource<Course>;
  selection = new SelectionModel<Course>(true, []);


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  selectAction: String = 'delete';

  constructor(private readonly helper: Helper,
    private readonly _CourseService: CourseService,
    private authenticationService: AuthenticationService,
    public dialog: MatDialog) {
  }

  ngOnInit() {
    this.initCourses();
    this.initDataSource();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  initDataSource() {
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(this.Courses);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  initCourses() {
    this.authenticationService.currentUser.subscribe(data => {
      this.currentUser = data;
      const roles = this.currentUser ? this.currentUser.roles.map(item => item.name) : [];
      if (roles.indexOf('ADMINISTRATION') > -1) {
        if (this.currentUser && this.currentUser.id) {
          this.getLevelByEstablishement(this.currentUser.id);
        }
      } else if (roles.indexOf('SUPER_ADMIN') > -1) {
        this.getAllCourse();
      }
    });
  }
  /**
  * Get all Courses
  */
  getAllCourse() {
    this._CourseService.getAllCourses().subscribe(
      (data: Course[]) => {
        this.Courses = data;
        // Assign the data to the data source for the table to render
        this.dataSource = new MatTableDataSource(this.Courses);
      }
      ,
      error => this.helper.handleError,
      () => this.helper.trace('Get all Courses complete ' + this.Courses.length));
  }

  getLevelByEstablishement(administrationId: number) {
    this._CourseService.getCourseByAdministration(administrationId).subscribe(
      (data: Course[]) => {
        this.Courses = data;
        // Assign the data to the data source for the table to render
        this.dataSource = new MatTableDataSource(this.Courses);
      }
      ,
      error => this.helper.handleError,
      () => this.helper.trace('Get all Courses complete ' + this.Courses.length));
  }


  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Course): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  openDialog(course: Course, action: string): void {
    const dialogRef = this.dialog.open(CourseModalComponent, {
      width: '600px',
      data: { course: course, action: action, currentUser: this.currentUser }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.initCourses();
      this.helper.trace('The dialog was closed' + result);
    });
  }

}
