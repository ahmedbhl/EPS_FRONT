import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Helper } from 'src/app/core/helper.service';
import { Library } from '../model/library';
import { LibraryService } from '../services/library.service';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
})
export class LibraryComponent implements OnInit {

  librarys: Library[] = [];

  displayedColumns: string[] = ['select', 'name', 'client_modified', 'size'];
  dataSource: MatTableDataSource<Library>;
  selection = new SelectionModel<Library>(true, []);


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  selectAction: String = 'delete';

  constructor(private readonly helper: Helper,
    private readonly _LibraryService: LibraryService) {
  }

  ngOnInit() {
    this.getAllLibrary();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  /**
  * Get all Librarys
  */
  getAllLibrary() {
    this._LibraryService.getAlllibrarys().subscribe(
      (data: Library[]) => {
        this.librarys = data;
        // Assign the data to the data source for the table to render
        this.dataSource = new MatTableDataSource(this.librarys);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
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

}
