import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';
import { Helper } from 'src/app/core/helper.service';
import { User } from 'src/app/shared/models/user.class';
import { FieldModalComponent } from '../field-modal/field-modal.component';
import { Field } from '../model/field';
import { FieldService } from '../services/field.service';

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.css']
})
export class FieldComponent implements OnInit {

  fields: Field[] = [];
  currentUser: User;
  displayedColumns: string[] = ['select', 'fieldName', 'description', 'level', 'more'];
  dataSource: MatTableDataSource<Field>;
  selection = new SelectionModel<Field>(true, []);


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  selectAction: String = 'delete';

  constructor(private readonly helper: Helper,
    private readonly _FieldService: FieldService,
    private authenticationService: AuthenticationService,
    public dialog: MatDialog) {
  }

  ngOnInit() {
    this.initFields();
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
    this.dataSource = new MatTableDataSource(this.fields);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  initFields() {
    this.authenticationService.currentUser.subscribe(data => {
      this.currentUser = data;
      const roles = this.currentUser ? this.currentUser.roles.map(item => item.name) : [];
      if (roles.indexOf('ADMINISTRATION') > -1) {
        if (this.currentUser && this.currentUser.id) {
          this.getLevelByEstablishement(this.currentUser.id);
        }
      } else if (roles.indexOf('SUPER_ADMIN') > -1) {
        this.getAllField();
      }
    });
  }

  /**
  * Get all Fields
  */
  getAllField() {
    this._FieldService.getAllFields().subscribe(
      (data: Field[]) => {
        this.fields = data;
        // Assign the data to the data source for the table to render
        this.dataSource = new MatTableDataSource(this.fields);
      }
      ,
      error => this.helper.handleError,
      () => this.helper.trace('Get all Fields complete ' + this.fields.length));
  }

  getLevelByEstablishement(administrationId: number) {
    this._FieldService.getFieldsByAdministration(administrationId).subscribe(
      (data: Field[]) => {
        this.fields = data;
        // Assign the data to the data source for the table to render
        this.dataSource = new MatTableDataSource(this.fields);
      }, error => this.helper.handleError,
      () => this.helper.trace('Get all fields complete ' + this.fields.length));
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
  checkboxLabel(row?: Field): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  openDialog(field: Field, action: string): void {
    const dialogRef = this.dialog.open(FieldModalComponent, {
      width: '600px',
      data: { field: field, action: action, currentUser: this.currentUser }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.initFields();
      this.helper.trace('The dialog was closed' + result);
    });
  }

}
