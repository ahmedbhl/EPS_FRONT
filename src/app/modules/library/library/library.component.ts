import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';
import { Helper } from 'src/app/core/helper.service';
import { User } from 'src/app/shared/models/user.class';
import { LibraryModalComponent } from '../library-modal/library-modal.component';
import { Library } from '../model/library';
import { LibraryService } from '../services/library.service';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
})
export class LibraryComponent implements OnInit {

  librarys: Library[] = [];

  displayedColumns: string[] = ['select', 'name', 'client_modified', 'size', 'more'];
  dataSource: MatTableDataSource<Library>;
  selection = new SelectionModel<Library>(true, []);
  currentFileUpload: File;


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  selectAction: String = 'delete';
  currentUser: User;


  constructor(private readonly helper: Helper,
    private readonly _LibraryService: LibraryService,
    private readonly _authenticationService: AuthenticationService,
    public dialog: MatDialog) {
    this._authenticationService.currentUser.subscribe(data => {
      this.currentUser = data;
    });
  }

  ngOnInit() {
    this.getAllLibrary();
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
    this.dataSource = new MatTableDataSource(this.librarys);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  /**
  * Get all Librarys
  */
  getAllLibrary() {
    this._LibraryService.getAlllibrarys(this.currentUser.id).subscribe(
      (data: Library[]) => {
        this.librarys = data;
        // Assign the data to the data source for the table to render
        this.dataSource = new MatTableDataSource(this.librarys);
      }
      ,
      error => this.helper.handleError,
      () => this.helper.trace('Get all Librarys complete ' + this.librarys.length));
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
  checkboxLabel(row?: Library): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  openDialog(action: string, library?: Library): void {
    const dialogRef = this.dialog.open(LibraryModalComponent, {
      // width: '600px',
      data: { library: library, action: action }
    });

    dialogRef.afterClosed().subscribe(result => {
      setTimeout(() => {
        this.getAllLibrary();
      }, 2000);

      this.helper.trace('The dialog was closed' + result);
    });
  }

  /**
     * Upload file csv with list of pairings
     */
  upload(event) {
    // this.inProgressBar = true;
    this.currentFileUpload = event.target.files;
    const path = `/${this.currentUser.id}/${this.currentFileUpload[0].name}`;
    this._LibraryService.uploadFile(this.currentFileUpload[0], path).subscribe(
      response => {
        setTimeout(() => {
          this.getAllLibrary();
          this.helper.trace('upload file done');
        }, 2000);
      },
    );
  }

}
