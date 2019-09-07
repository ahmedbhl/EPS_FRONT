import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Helper } from 'src/app/core/helper.service';
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

  // tslint:disable-next-line: max-line-length
  displayedColumns: string[] = ['select', 'id', 'photos', 'establishmentName', 'description', 'location', 'administration', 'yearOfFoundation', 'more'];
  dataSource: MatTableDataSource<EducationalInstitution>;
  selection = new SelectionModel<EducationalInstitution>(true, []);
  selectAction: String = 'delete';
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(private readonly helper: Helper,
    private readonly _educationalInstitutionService: EducationalInstitutionService,
    public dialog: MatDialog) {
  }

  ngOnInit() {
    this.getAllEducationalInstitution();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
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
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
      ,
      error => this.helper.handleError,
      () => this.helper.trace('Get all educational Institutions complete ' + this.educationalInstitutions.length));
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
      this.helper.trace('The dialog was closed' + result);
    });
  }
}

