import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';
import { Helper } from 'src/app/core/helper.service';
import { User } from 'src/app/shared/models/user.class';
import { EducationalInstitutionModalComponent } from './educational-institution-modal/educational-institution-modal.component';
import { EducationalInstitution } from './model/educational-institution';
import { EducationalInstitutionService } from './services/educational-institution.service';

@Component({
  selector: 'app-educational-institution',
  templateUrl: './educational-institution.component.html',
  styleUrls: ['./educational-institution.component.css']
})
export class EducationalInstitutionComponent implements OnInit {

  educationalInstitutions: EducationalInstitution[] = [];
  singleEducationalInstitution: EducationalInstitution;

  // tslint:disable-next-line: max-line-length
  displayedColumns: string[] = ['select', 'id', 'photos', 'establishmentName', 'description', 'location', 'administration', 'yearOfFoundation', 'more'];
  dataSource: MatTableDataSource<EducationalInstitution>;
  selection = new SelectionModel<EducationalInstitution>(true, []);
  selectAction: String = 'delete';
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  currentUser: User;
  isSuperAdmin: boolean;

  constructor(private readonly helper: Helper,
    private readonly _educationalInstitutionService: EducationalInstitutionService,
    public dialog: MatDialog,
    private readonly userService: AuthenticationService) {
  }

  ngOnInit() {
    this.initCurrentUser();
  }

  /**
   * Init the Current User for specify wich UI should be display
   */
  initCurrentUser() {
    this.userService.currentUser.subscribe(data => {
      this.currentUser = data;
      if (!data) {
        this.helper.trace('[Error] Impossible to load Current User!');
      }
      if (data && this.currentUser !== null) {
        const roles = this.currentUser ? this.currentUser.roles.map(item => item.name) : [];
        if (roles.indexOf('ADMINISTRATION') > -1) {
          this.isSuperAdmin = false;
        } else if (roles.indexOf('SUPER_ADMIN') > -1) {
          this.isSuperAdmin = true;
          this.getAllEducationalInstitution();
        }
      }
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  initDataSource() {
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(this.educationalInstitutions);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  /**
  * Get all Educational Institutions
  */
  getAllEducationalInstitution() {
    this._educationalInstitutionService.getAllEducationalInstitution().subscribe(
      (data: EducationalInstitution[]) => {
        this.educationalInstitutions = data;
        // Assign the data to the data source for the table to render
        this.dataSource = new MatTableDataSource(this.educationalInstitutions);
      }
      ,
      error => this.helper.handleError,
      () => this.helper.trace('Get all educational Institutions complete ' + this.educationalInstitutions.length));
  }

  /**
  * Get Educational Institutions Byid
  */
  getEducationalInstitutionById(id: number) {
    this._educationalInstitutionService.getEducationalInstitutionById(id).subscribe(
      (data: EducationalInstitution) => {
        this.singleEducationalInstitution = data;
      }, error => this.helper.handleError,
      () => this.helper.trace('Get the educational Institutions complete ' + this.singleEducationalInstitution.id));
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
  checkboxLabel(row?: EducationalInstitution): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(EducationalInstitutionModalComponent, {
      width: '600px',
      data: { name: 'Guest', animal: 'Guest' }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getAllEducationalInstitution();
      this.helper.trace('The dialog was closed' + result);
    });
  }
}

