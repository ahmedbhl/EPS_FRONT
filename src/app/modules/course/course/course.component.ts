import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Helper } from 'src/app/core/helper.service';
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

  displayedColumns: string[] = ['select', 'id', 'courseName', 'description', 'classe', 'professor', 'more'];
  dataSource: MatTableDataSource<Course>;
  selection = new SelectionModel<Course>(true, []);


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  selectAction: String = 'delete';

  constructor(private readonly helper: Helper,
    private readonly _CourseService: CourseService,
    public dialog: MatDialog) {
  }

  ngOnInit() {
    this.getAllCourse();
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
      data: { course: course, action: action }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getAllCourse();
      this.helper.trace('The dialog was closed' + result);
    });
  }

}
